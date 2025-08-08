import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Text,
  View,
  Platform,
  Pressable,
  TextInput,
  Animated,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./style";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { chatAPI, handleAPIError } from "../utils/requete";
import { storage } from "../utils/storage";

interface Message {
  id: number;
  roomId: number;
  sender: {
    id: number;
    username: string;
    nom: string;
    prenom: string;
    phone_number: string;
  };
  message: string;
  state: 'send' | 'receive' | 'read';
  created_at: string;
  updated_at: string;
}

export default function Message() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const currentRoomId = "1"; // À remplacer par l'ID réel de la room

  const loadMessages = async () => {
    try {
      const messagesData = await chatAPI.getMessages(currentRoomId);
      setMessages(messagesData);
      await storage.setMessagesData(currentRoomId, messagesData);
    } catch (error) {
      const errorMessage = handleAPIError(error);
      Alert.alert("Erreur", errorMessage);
      
      const cachedMessages = await storage.getMessagesData(currentRoomId);
      if (cachedMessages) {
        setMessages(cachedMessages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    setIsSending(true);
    const tempMessage: Message = {
      id: Date.now(),
      roomId: parseInt(currentRoomId),
      sender: {
        id: 1,
        username: "current_user",
        nom: "Current",
        prenom: "User",
        phone_number: "+33123456789",
      },
      message: messageText.trim(),
      state: 'send',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, tempMessage]);
    setText("");

    try {
      const sentMessage = await chatAPI.sendMessage(currentRoomId, messageText.trim());
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? sentMessage : msg
      ));

      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      Alert.alert("Erreur", errorMessage);
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      setText(messageText);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const isOwnMessage = (message: Message) => {
    return message.sender.id === 1;
  };

  useEffect(() => {
    loadMessages();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={headerStyles.header}>
            <View style={headerStyles.headerContent}>
              <View style={headerStyles.avatar}>
                <Text style={headerStyles.avatarText}>👤</Text>
              </View>
              <View style={headerStyles.userInfo}>
                <Text style={headerStyles.userName}>Chargement...</Text>
                <Text style={headerStyles.userStatus}>Connexion...</Text>
              </View>
            </View>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Chargement des messages...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={headerStyles.header}>
          <View style={headerStyles.headerContent}>
            <View style={headerStyles.avatar}>
              <Text style={headerStyles.avatarText}>👤</Text>
            </View>
            <View style={headerStyles.userInfo}>
              <Text style={headerStyles.userName}>John Doe</Text>
              <Text style={headerStyles.userStatus}>En ligne</Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
          style={styles.container}
        >
          <View style={{ flex: 1 }}>
            {messages.length > 0 ? (
              <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item }) => {
                  const isOwn = isOwnMessage(item);
                  return (
                    <View
                      style={
                        isOwn
                          ? styles.sendView
                          : styles.receivedView
                      }
                    >
                      <Text
                        style={
                          isOwn
                            ? styles.sendText
                            : styles.receivedText
                        }
                      >
                        {item.message}
                      </Text>
                      <View style={styles.metaDataView}>
                        <Text style={styles.metaDataText}>
                          {formatTime(item.created_at)}
                        </Text>
                        {isOwn && (
                          <Ionicons 
                            name={item.state === "read" ? "checkmark-done" : "checkmark"} 
                            size={12} 
                            color={item.state === "read" ? "#007AFF" : "#8E8E93"} 
                          />
                        )}
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingVertical: 16 }}
              />
            ) : (
              <View style={emptyStyles.container}>
                <Ionicons name="chatbubble-outline" size={64} color="#C7C7CC" />
                <Text style={emptyStyles.title}>Aucun message</Text>
                <Text style={emptyStyles.subtitle}>Commencez une conversation en envoyant un message</Text>
              </View>
            )}
          </View>

          <View style={styles.inputView}>
            <View style={styles.row}>
              <TextInput
                placeholder="Tapez votre message..."
                placeholderTextColor="#8E8E93"
                multiline
                style={styles.input}
                value={text}
                onChangeText={setText}
                editable={!isSending}
              />
              <View style={inputStyles.sendContainer}>
                <Pressable
                  style={[inputStyles.sendButton, isSending && inputStyles.sendButtonDisabled]}
                  onPress={() => sendMessage(text)}
                  disabled={isSending || !text.trim()}
                >
                  {isSending ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Ionicons name="send" size={20} color="white" />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  userStatus: {
    fontSize: 14,
    color: "#34C759",
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8E8E93",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#C7C7CC",
    textAlign: "center",
    lineHeight: 22,
  },
});

const inputStyles = StyleSheet.create({
  sendContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#C7C7CC",
  },
});

// Ajouter les styles manquants au fichier style.ts existant
const additionalStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#8E8E93",
  },
});
