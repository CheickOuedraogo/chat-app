import { View, Text, TextInput, KeyboardAvoidingView, Pressable, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

const InputMessage = () => {
  return (
    <View
      className="w-screen flex-row items-center"
    >
        <TextInput
        placeholder="entre votre message ..."
          multiline
          className="flex-1 p-3 min-h-[48px] max-h-[100px] m-4 rounded-lg outline-none border-none border-transparent  ring-0 bg-white"
        />
        <Pressable className="h-full justify-center items-center">
          <Ionicons name="send-outline" size={24} color="black" />
        </Pressable>
      
    </View>
  );
};

export default InputMessage;
