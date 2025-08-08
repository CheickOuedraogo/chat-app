import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface RoomProps {
  username: string;
  lastMessage: string;
  date: Date;
  numero: string;
  formattedDate?: string;
}

function cutMessage(message: string): string {
  if(message.length < 50) return message;
  return message.slice(0,50) + "...";
}

function getInitials(username: string): string {
  if(username && username.length > 0) {
    const names = username.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return username[0].toUpperCase();
  }
  return "??";
}

const RoomBox: React.FC<RoomProps> = (props) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(props.username)}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.username}>{props.username || props.numero}</Text>
          <Text style={styles.date}>{props.formattedDate || "THU 05:12"}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {cutMessage(props.lastMessage)}
        </Text>
      </View>
      <View style={styles.actions}>
        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  date: {
    fontSize: 12,
    color: "#8E8E93",
  },
  message: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 18,
  },
  actions: {
    marginLeft: 8,
  },
});

export default RoomBox;
