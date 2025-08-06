import { View, Text, StyleSheet } from "react-native";
import type { Imessage } from "../utils/types";

const Message = (message: Imessage) => {
  return (
    <View
      style={
        message.direction === "left" ? styles.receivedView : styles.sendView
      }
    >
      <Text
        style={
          message.direction == "left" ? styles.receivedText : styles.sendText
        }
      >
        {message.details}
      </Text>
      <View style={styles.metaDataView}>
        <Text style={styles.metaDataText}>{message.time.getHours()}:{message.time.getMinutes()}</Text>
        <Text style={styles.metaDataText}>{message.state}</Text>
      </View>
    </View>
  );
};

export default Message;
const styles = StyleSheet.create({
  sendView: {
    padding: 5,
    minHeight: 45,
    maxHeight:200,
    width: "100%",
    alignItems: "flex-end",
    marginVertical: 2,
    marginHorizontal:5
  },
  receivedView: {
    width: "100%",
    alignItems: "flex-start",
    marginVertical: 2,
    marginHorizontal:5
  },
  sendText: {
    backgroundColor: "rgba(0,0,200,0.7)",
    color: "white",
    borderRadius: 5,
    width: "80%",
    padding: 5,
    marginHorizontal: 10
  },
  receivedText: {
    backgroundColor: "rgba(0,200,0,0.7)",
    color: "white",
    borderRadius: 5,
    width: "80%",
    padding: 5,
    marginHorizontal: 10
  },
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
  metaDataView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginHorizontal: 15
  },
  metaDataText: {
    marginHorizontal: 5
  },
});
