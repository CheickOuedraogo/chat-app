import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface roomProps{
  username:String;
  lastMessage: String;
  date: Date;
  numero: String;
}

function cutMessage(message : String):String{
  if(message.length < 30) return message
  return message.slice(0,30) + " ..."
}
function getIcone(username: String): String {
  if(username && username.length > 0)
    return username[0]
  return "??"
}
const roomBox = (prop: roomProps) => {
  return (
    <View style={styles.view}>
      <View style={styles.details}>
        <View style={styles.icone}>
          <Text style={styles.iconeText}>{getIcone(prop.username)}</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.username}>{prop.username || prop.numero}</Text>
          <Text> {cutMessage(prop.lastMessage)}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text> THU 05:12</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  data:{
    marginLeft:15
  },
  username:{
    fontWeight:"600",
    textAlign:"center",
    marginLeft: 15
  },
  details:{
    flexDirection:"row"
  },
  date:{
    margin:10
  },
  view: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#CCC8BF",
    margin: 5,
    padding: 10,
    justifyContent: "space-between"
  },
  icone: {
    borderRadius: "50%",
    backgroundColor: "blue",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  iconeText: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
  },
  text: {
    justifyContent: "flex-end",
  },
});

export default roomBox;
