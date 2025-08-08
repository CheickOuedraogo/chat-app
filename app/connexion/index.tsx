import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { authAPI, handleAPIError } from "../utils/requete";
import { storage } from "../utils/storage";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Validation des champs
    if (!phoneNumber.trim()) {
      Alert.alert("Erreur", "Veuillez saisir votre numéro de téléphone");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Erreur", "Veuillez saisir votre mot de passe");
      return;
    }

    // Validation du format du numéro de téléphone
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      Alert.alert("Erreur", "Format de numéro invalide. Utilisez le format international (ex: +33123456789)");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login({
        phone_number: phoneNumber.trim(),
        password: password.trim(),
      });

      // Sauvegarder les données de connexion
      if (response.token && response.user) {
        await storage.setAuthToken(response.token);
        await storage.setUserData(response.user);
        
        Alert.alert(
          "Connexion réussie", 
          `Bienvenue ${response.user.prenom} ${response.user.nom}!`,
          [
            {
              text: "OK",
              onPress: () => router.replace("/(pages)")
            }
          ]
        );
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      Alert.alert("Erreur de connexion", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        style={styles.center}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Connexion</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Numéro de téléphone</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="phone-pad" 
            placeholder="+226 12345678" 
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            placeholder="Votre mot de passe"
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
        </View>

        <Text style={styles.linkText}>
          Pas de compte ?{" "}
          <Link
            href="/connexion/inscription"
            style={styles.link}
          >
            Inscription
          </Link>
        </Text>

        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  center: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  linkText: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "#007AFF",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#C7C7CC",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
