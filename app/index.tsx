import {
  FlatList,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import "../global.css";

import Message from "./components/Message";
import { useState } from "react";
import { Imessage } from "./utils/types";
import InputMessage from "./components/InputMessage";
import { SafeAreaView } from "react-native-safe-area-context";
/*
export default function Index() {
  const [messages, setMessage] = useState<Imessage[]>([
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
    {
      direction: "left",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "read",
    },
    {
      direction: "right",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sequi rem provident delectus. Vero at fugit atque iste sed pariatur illum autem quis, ab explicabo, facere saepe id quasi quas!",
      time: "10h40",
      state: "receive",
    },
  ]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        className="flex-1"
      >
         <View className="flex-1">
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

      <View className=" bottom-0 w-full">
        <InputMessage />
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
*/

const Index = () => {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={20}
        className="flex-1 relative"
      >
        <View className=" fixed bottom-0 bg-gray-300 p-5 w-full">
          <TextInput placeholder="enter some text here .." />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Index;
