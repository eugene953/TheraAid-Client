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
  Alert
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@/redux/slices/chatSlice';
import { RootState } from '@/redux/store';
import { ChatMessage } from '@/types/chatTypes';
import { Stack } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '@/config';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

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

  const dispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.chat);

  let flatListRef: FlatList<any> | null = null;


  const auth = useSelector((state: RootState) => state.auth);

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

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!userId || !token) {
      Alert.alert('Not authenticated', 'Please log in again.');
      return;
    }

    setLoading(true);

    const userMessage: ChatMessage = {
      user_id: userId,
      message: input,
      response: '',
    };

    dispatch(addMessage(userMessage));

    try {
      const res = await axios.post(`${API_URL}/api/chat`,
        {
          user_id: userId,
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        }
        
      );

      const responseText = res.data.reply;

      const botMessage: ChatMessage = {
        user_id: 0,
        message: '',
        response: responseText,
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
         
          <ScrollView style={styles.inner}>
          <View style={styles.chatContainer}>
  <FlatList
    data={messages}
    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
    ListHeaderComponent={() => (
      <View style={styles.background}>
        <Image source={require('../assets/images/ChatScreen.png')} style={styles.image} />
        <Text style={styles.description}>Capabilities</Text>
      </View>
    )}
    renderItem={({ item }) => (
      <View
        style={[
          styles.messageContainer,
          item.user_id === userId ? styles.myMessage : styles.botMessage,
        ]}
      >
        {item.user_id === userId ? (
          <Text style={styles.myMessageText}>{item.message}</Text>
        ) : (
          <Text style={styles.botMessageText}>{item.response}</Text>
        )}
      </View>
    )}
    contentContainerStyle={styles.messageList}
    showsVerticalScrollIndicator={false}
    onContentSizeChange={() => {
      flatListRef?.scrollToEnd({ animated: true });
    }}
    ref={(ref) => (flatListRef = ref)}
  />
</View>

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
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="mic" size={20} color="white" />
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  inner: { flex: 1, padding: 16,  },
  background:{

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
    textDecorationColor: '#212121',
  },
  botMessageText: {
    color: Colors.primary,
    fontSize: 16,
  },
  messageText: {  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 8,
    
  },
  textBar: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 8,
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
