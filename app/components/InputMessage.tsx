import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
interface InputMessageProps {
  prop: (message: string) => void;
}

const InputMessage: React.FC<InputMessageProps> = ({prop}) => {
  const [text, setText] = useState("");
  return (

      <View style={styles.view}>
        <TextInput
          placeholder="entre votre message ..."
          multiline
          style={styles.input}
          value={text}
          onChangeText={(textValue) => setText(textValue)}
        />
        <Pressable
          onPress={() => {
            prop(text);
          }}
        >
          <Ionicons name="send-outline" size={24} color="black" />
        </Pressable>
      </View>

  );
};

export default InputMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    margin: 4,
    borderRadius: 5,
    outline: "none",
    borderColor: "transparent",
    backgroundColor: "white",
  },
  pressable: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    //className = "h-full justify-center items-center",
  },
});
