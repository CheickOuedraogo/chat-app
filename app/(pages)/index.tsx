import React, { useState, useRef } from "react";
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
} from "react-native";
import styles from "./style";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Imessage {
  direction: "left" | "right";
  details: string;
  time: Date;
  state: "send" | "receive" | "read";
}
export default function Message() {
  function addMessage(message: string, direction: "left" | "right" = "right") {
    if (message.trim() == "") return;
    const messageData: Imessage = {
      direction: direction,
      details: message,
      time: new Date(),
      state: "send",
    };
    setMessage((prev) => [...prev, messageData]);
  }

  const [messages, setMessage] = useState<Imessage[]>([]);
  const [text, setText] = useState("");
  const flatListeRef = useRef<FlatList>(null);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
          style={styles.container}
        >
          <View style={{ flex: 1 }}>
            {messages.length > 0 ? (
              <FlatList
                ref={flatListeRef}
                data={messages}
                renderItem={({ item }) => (
                  <View
                    style={
                      item.direction === "left"
                        ? styles.receivedView
                        : styles.sendView
                    }
                  >
                    <Text
                      style={
                        item.direction == "left"
                          ? styles.receivedText
                          : styles.sendText
                      }
                    >
                      {item.details}
                    </Text>
                    <View style={styles.metaDataView}>
                      <Text style={styles.metaDataText}>
                        {item.time.getHours()}:{item.time.getMinutes()}
                      </Text>
                      <Text style={styles.metaDataText}>{item.state}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(_, index) => `${index}`}
              />
            ) : (
              <Text style={{ fontSize: 20 }}>Aucun message </Text>
            )}
          </View>

          <View style={styles.inputView}>
            <View style={styles.row}>
              <TextInput
                placeholder="entre votre message ..."
                multiline
                style={styles.input}
                value={text}
                onChangeText={(textValue) => setText(textValue)}
              />
              <View>
                <Pressable
                  onPress={() => {
                    addMessage(text);
                    if (flatListeRef.current)
                      flatListeRef.current.scrollToEnd({ animated: true });
                  }}
                >
                  <Ionicons name="send-outline" size={24} color="black" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    addMessage(text, "left");
                    if (flatListeRef.current)
                      flatListeRef.current.scrollToEnd({
                        animated: true,
                      });
                  }}
                >
                  <Ionicons name="send-outline" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
