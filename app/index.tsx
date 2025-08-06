import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.background}>
      <Text>rien actuellement</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
});
