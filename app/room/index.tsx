import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from './roomBox'

const index = () => {
  const [room,setRoom] = useState();
  return <SafeAreaView>
    <Box username="" lastMessage="😂lorem isps zflknf uhfzhf,n ufizhfuze hjkzhiufiuzey hufgzyugfze fheuzhufzhe" date={new Date()} numero="+22656197406"/>
  </SafeAreaView>;
};

export default index;
