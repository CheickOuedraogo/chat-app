import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        style={styles.center}
      >
        <View style={styles.inputContainer}>
          <Text style={{ marginHorizontal: 5 }}>Nom</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginHorizontal: 5 }}>Prenom</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginHorizontal: 5 }}>E-Mail</Text>
          <TextInput style={styles.input} keyboardType="email-address"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginHorizontal: 5 }}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ marginHorizontal: 5 }}>Confirm Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />
        </View>
        <Text style={{ letterSpacing: 2 }}>
          Dejà un compte ?{" "}
          <Link href="/connexion" style={{ color: "blue", letterSpacing: 1 }}>
            Connexion
          </Link>
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            alert("La fonction sera disponible plus tard");
          }}
        >
          <Text style={styles.buttonText}>Inscription</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    fontWeight: "400",
    marginVertical: 10,
  },
  button: {
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    backgroundColor: "rgba(0,230,0,0.8)",
    color: "white",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  center: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
