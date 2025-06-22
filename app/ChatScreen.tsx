import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearMessages } from '@/redux/slices/chatSlice';
import { RootState } from '@/redux/store';
import { ChatMessage } from '@/types/chatTypes';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '@/config';
import Voice from '@react-native-voice/voice';
import { useLocalSearchParams } from 'expo-router';
import { setSessionId } from '@/redux/slices/chatSessionSlice';
import Header from '@/components/Headers/Header';
import ShareMessageModal from '@/components/Modal/ShareMessageModal';
import * as Clipboard from 'expo-clipboard';
//import { fetchMessages } from '@/redux/slices/chatSlice';



type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

const ChatScreen = () => {
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [touchedMessageIndex, setTouchedMessageIndex] = useState<number | null>(null);


  const dispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.chat);
  const auth = useSelector((state: RootState) => state.auth);
  const sessionId = useSelector((state: RootState) => state.chatSession.sessionId);

  let flatListRef: FlatList<any> | null = null;
  
  const [isRecording, setIsRecording] = useState(false);

  const onSpeechResults = (event: any) => {
    const spokenText = event.value[0];
    setInput(spokenText); // Insert text into input box automatically
  };

  const onSpeechError = (error: any) => {
    console.error('Speech error:', error);
    Alert.alert('Voice Error', 'Failed to recognize speech.');
  };

  const handleMicPress = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
        setIsRecording(false);
      } else {
        await Voice.start('en-US'); // Use 'en-US' for English/Pidgin. Local dialects may need 'pcm' for raw audio + cloud processing.
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Mic press error:', error);
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (flatListRef && messages.length > 0) {
      flatListRef.scrollToEnd({ animated: true });
    }
  }, [messages]);
  

  useEffect(() => {
    if (auth.token) {
      try {
        const decoded = jwtDecode<JWTPayload>(auth.token);
        setUserId(decoded.id);
        setToken(auth.token);
      } catch (error) {
        console.error('Token decoding failed:', error);
        Alert.alert('Error', 'Session invalid. Please log in again.');
      }
    }
  }, [auth.token]);

  // set session chat when user navigate from history
  const params = useLocalSearchParams();
  const navigationSessionId = params.session_id ? parseInt(params.session_id as string, 10) : null;
  
  useEffect(() => {
    if (navigationSessionId && navigationSessionId !== sessionId) {
      dispatch(setSessionId(navigationSessionId));
    }
  }, [navigationSessionId]);

  // FETCH MESSAGES when sessionId changes
 useEffect(() => {
  const fetchMessages = async () => {
    if (!auth.token || !sessionId) return;

    try {
      const response = await axios.get(`${API_URL}/chat/messages/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      dispatch(clearMessages());

      response.data.messages.forEach((msg: any) => {
        // Add the user message
        const userMessage: ChatMessage = {
          user_id: msg.user_id,
          message: msg.message,
          response: '',
          session_id: msg.session_id,
          timestamp: msg.timestamp,
        };
        dispatch(addMessage(userMessage));

        // Add the bot response
        if (msg.response && msg.response.trim() !== '') {
          const botMessage: ChatMessage = {
            user_id: 0, // 0 indicates bot
            message: '',
            response: msg.response,
            session_id: msg.session_id,
            timestamp: msg.timestamp,
          };
          dispatch(addMessage(botMessage));
        }
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      Alert.alert('Could not load previous messages.');
    }
  };

  fetchMessages();
}, [sessionId, auth.token]);



useEffect(() => {
  return () => {
    dispatch(clearMessages()); 
  };
}, []);


  
// #fetch message base on session id when session id changes#

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!userId || !token) {
      Alert.alert('Not authenticated', 'Please log in again.');
      return;
    }

    if (sessionId === null) {
      Alert.alert('Error', 'Session ID is missing.');
      return;
    }    

    if (!sessionId) {
      Alert.alert('session_id is required' );
    }

    setLoading(true);

    const userMessage: ChatMessage = {
      user_id: userId,
      message: input,
      response: '',
      session_id: sessionId,
    };

    dispatch(addMessage(userMessage));

    try {
      const res = await axios.post(  `${API_URL}/api/chat`,
        {
          user_id: userId,
          message: input,
          session_id: sessionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(res.data.inactive) {
        Alert.alert(
          "Session Inactive",
          "This chat session has been active for more than 12 hours. Please start a new session, or you can continue using this session within the next 3 hours."
        );
      }

      const responseText = res.data.reply;

      const botMessage: ChatMessage = {
        user_id: 0,
        message: '',
        response: responseText,
        session_id: sessionId,
      };

      dispatch(addMessage(botMessage));
    } catch (error: any) {
      console.error('Chat error:', error);
      Alert.alert('Error', 'Failed to send message. Try again.');
    } finally {
      setInput('');
      setLoading(false);
    }
  };

  const handleContentSizeChange = (_: number, height: number) => {
    setInputHeight(height);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={80}
      >
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
         
              <FlatList
                data={messages}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                ListHeaderComponent={() => (
                  <View style={styles.header}>
                    <Image
                      source={require('../assets/images/ChatScreen.png')}
                      style={styles.image}
                    />
                    <Text style={styles.description}>Capabilities</Text>
                  </View>
                )}

    renderItem={({ item, index }) => {
    const isTouched = touchedMessageIndex === index;
   return (
    <View>
      {/* User Message (if exists) */}
      {item.message && (
        <TouchableOpacity
          onPress={() => setTouchedMessageIndex(isTouched ? null : index)}
          activeOpacity={0.8}
          style={[styles.messageContainer, styles.myMessage]}
        >
          <Text style={styles.myMessageText}>{item.message}</Text>
        </TouchableOpacity>
      )}

      {/* Bot Response (if exists) */}
      {item.response && (
        <TouchableOpacity
          onPress={() => setTouchedMessageIndex(isTouched ? null : index)}
          activeOpacity={0.8}
          style={[styles.messageContainer, styles.botMessage]}
        >
          <Text style={styles.botMessageText}>{item.response}</Text>

          {/* Show copy/share icons if touched */}
          {isTouched && (
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setStringAsync(item.response);
                  Alert.alert('Copied to clipboard');
                }}
              >
                <Ionicons name="copy-outline" size={18} color="#201D67" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedMessage(item.response);
                  setShowShareModal(true);
                }}
              >
                <Ionicons name="share-social-outline" size={18} color="#201D67" style={styles.icon} />
              </TouchableOpacity>
              </View>
              )}
              </TouchableOpacity>
              )}
              </View>
              );
              }}

                contentContainerStyle={styles.messageList}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => {
                  flatListRef?.scrollToEnd({ animated: true });
                }}
                ref={(ref) => (flatListRef = ref)}
              />
           

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textBar, { height: inputHeight }]}
                placeholder="Ask me anything..."
                placeholderTextColor={Colors.gray}
                multiline
                value={input}
                onChangeText={setInput}
                onContentSizeChange={(e) =>
                  handleContentSizeChange(
                    e.nativeEvent.contentSize.width,
                    e.nativeEvent.contentSize.height
                  )
                }
              />
              <View style={styles.chatButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={handleMicPress}>
             <Ionicons
              name={isRecording ? 'mic-off' : 'mic'}
              size={20}
              color="white"
                />
              </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={sendMessage}
                  disabled={loading}
                >
                  <Ionicons
                    name="send"
                    size={20}
                    color="white"
                    style={{ transform: [{ rotate: '-45deg' }] }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

        <ShareMessageModal
  visible={showShareModal}
  onClose={() => setShowShareModal(false)}
  message={selectedMessage || ''}
/>
    </>

  

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  inner: { flex: 1, padding: 16, justifyContent: 'flex-start' },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  description: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 16,
    marginVertical: 10,
  },
  chatContainer: {
    flex: 1,
    marginTop: 10,
  },
  messageList: { paddingVertical: 10, flexGrow: 1 },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  myMessage: {
    backgroundColor: '#201D67',
    alignSelf: 'flex-end',
  },
  myMessageText: {
    color: Colors.white,
    fontSize: 16,
  },
  botMessage: {
    backgroundColor: Colors.lightGray,
    alignSelf: 'flex-start',
  },
  botMessageText: {
    color: Colors.primary,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  iconContainer: {
  flexDirection: 'row',
  position: 'absolute',
  right: 10,
  bottom: 10,
  gap: 10,
},
icon: {
  padding: 5,
  backgroundColor: '#fff',
  borderRadius: 10,
},
  textBar: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  chatButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    backgroundColor: '#7e8cff',
    padding: 10,
    borderRadius: 20,
  },
});

export default ChatScreen;
