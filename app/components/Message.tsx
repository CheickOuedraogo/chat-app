import { View, Text } from "react-native";
import type { Imessage } from "../utils/types";

const Message = (message: Imessage) => {
  return (
    <View
      className={
        message.direction == "left"
          ? "w-full items-start my-2 "
          : "w-full items-end my-2 "
      }
    >
      <Text
        className={
          message.direction == "left"
            ? "bg-blue-400 text-white w-9/12 p-2 rounded-xl"
            : "bg-blue-400 text-black w-9/12 p-2 rounded-xl"
        }
      >
        {message.details}
      </Text>
      <View className="flex-row w-full relative left-0 items-end justify-end">
        <Text className="mx-2 text-black">{message.time}</Text>
        <Text className="mx-2 text-black">{message.state}</Text>
      </View>
    </View>
  );
};

export default Message;
