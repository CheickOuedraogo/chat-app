import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Text,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import Message from "./components/Message";
import { Imessage } from "./utils/types";
import InputMessage from "./components/InputMessage";

export default function Index() {
  function addMessage(message: string) {
    const messageData: Imessage = {
      direction: "right",
      details: message,
      time: new Date(),
      state: "send",
    };
    setMessage((prev) => [...prev, messageData]);
  }
  const [messages, setMessage] = useState<Imessage[]>([]);
  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        style={styles.container}
      >
        <View style={styles.container}>
          {messages.length > 0 ? (
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <Message
                  direction={item.direction}
                  details={item.details}
                  time={item.time}
                  state={item.state}
                />
              )}
              keyExtractor={(_, index) => `${index}`}
            />
          ) : (
            <Text>Aucun message </Text>
          )}
        </View>

        <View style={styles.inputView}>
          <InputMessage prop={addMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inputView: {
    backgroundColor: "gray",
    padding: 5,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
