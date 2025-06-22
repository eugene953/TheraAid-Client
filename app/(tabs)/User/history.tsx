import HeaderHistory from '@/components/Headers/HeaderHistory';
import { Colors } from '@/constants/Colors';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { RootState } from '@/redux/store';
import { API_URL } from '@/config';
import { history } from '@/types/type';
import { Ionicons } from '@expo/vector-icons';
import { clearSession, setSessionId } from '@/redux/slices/chatSessionSlice';
import ClearHistoryModal from '@/components/Modal/ClearHistoryModal';
import { Swipeable } from 'react-native-gesture-handler';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

const History = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [sessions, setSessions] = useState<history[]>([]);
  const [loading, setLoading] = useState(true);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!auth.token) {
          Alert.alert('Not authenticated. Please log in.');
          return;
        }

        const decoded = jwtDecode<JWTPayload>(auth.token);
        const userId = decoded.id;

        const response = await axios.get(`${API_URL}/chat/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching history:', error);
        Alert.alert('Failed to load chat history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [auth.token]);

  // Filter sessions by message (case‐insensitive)
  const filteredSessions = sessions.filter((item) =>
    (item.message ?? 'Chat session')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Render right swipe action (Delete button)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    onDelete: () => void
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={onDelete} activeOpacity={0.6}>
        <View style={styles.deleteButton}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="trash" size={24} color="white" />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: history }) => {
    const handleDelete = () => {
      Alert.alert(
        'Delete Session',
        'Are you sure you want to delete this chat session?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setSessions((prev) =>
                prev.filter((s) => s.session_id !== item.session_id)
              );
              },
          },
        ]
      );
    };

    return (
      <Swipeable friction={2} rightThreshold={40}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, handleDelete)
        }
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            dispatch(setSessionId(item.session_id));
            router.push('/ChatScreen');
          }}
        >
          <View style={styles.row}>
            <Text style={styles.message} numberOfLines={1}>
              {item.message || 'Chat session'}
            </Text>
            <Ionicons
              style={styles.forwardMenu}
              name="chevron-forward"
              size={24}
              color="black"
            />
          </View>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()} •{' '}
            {new Date(item.start_time).toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const handleClearAll = () => {
    setSessions([]);
    setSearchQuery('');
    dispatch(clearSession());
    setShowModal(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => 
      showSearch ? (
              <View style={styles.searchHeader}>
                <TouchableOpacity
                  onPress={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  style={styles.headerIcon}
                >
                  <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="#888"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInputHeader}
                    placeholder="Search history..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCorrect={false}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                  />
                </View>
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.headerIcon} />
              </View>
            ) : (
              <HeaderHistory
                onSearchPress={() => setShowSearch(true)}
                onTrashPress={() => setShowModal(true)}
              />
            ),
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <>
            {filteredSessions.length > 0 ? (
              <FlatList
                data={filteredSessions}
                keyExtractor={(item, index) => `${item.session_id}-${index}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <View style={styles.column}>
                <Image
                  source={require('../../../assets/images/Not_Found.png')}
                  style={styles.image}
                />
                <Text style={styles.noHistoryHead}>Not Found</Text>
                <Text style={styles.noHistoryText}>
                  We're sorry, the keyword you were looking for could not be found.
                  Please search with another keywords.
                </Text>
              </View>
            )}
          </>
        )}
      </View>

      <ClearHistoryModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleClearAll}
      />
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerIcon: {
    padding: 4,
  },
  searchContainer: {
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    width: 280,
    top: 7,
  },
  searchInputHeader: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    borderColor: '#7280F3',
  },
  searchIcon: {
    marginRight: 8,
  },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 10,
  },
  forwardMenu: {
    alignSelf: 'center',
  },
  date: {
    fontSize: 12,
    color: '#7D7D7D',
    marginTop: 4,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  noHistoryHead: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 10,
  },
  noHistoryText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FA3737',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 16,
    padding: 25,
  },
});

export default History;
