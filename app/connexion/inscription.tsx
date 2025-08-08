import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { authAPI, handleAPIError } from "../utils/requete";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    username: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nom, prenom, username, phone_number, password, confirmPassword } = formData;

    if (!nom.trim()) {
      Alert.alert("Erreur", "Veuillez saisir votre nom");
      return false;
    }
    if (!prenom.trim()) {
      Alert.alert("Erreur", "Veuillez saisir votre prénom");
      return false;
    }
    if (!username.trim()) {
      Alert.alert("Erreur", "Veuillez saisir un nom d'utilisateur");
      return false;
    }
    if (!phone_number.trim()) {
      Alert.alert("Erreur", "Veuillez saisir votre numéro de téléphone");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Erreur", "Veuillez saisir un mot de passe");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return false;
    }

    // Validation du format du numéro de téléphone
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone_number.trim())) {
      Alert.alert("Erreur", "Format de numéro invalide. Utilisez le format international (ex: +33123456789)");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userData = {
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        username: formData.username.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password.trim(),
        email: formData.email.trim() || undefined,
      };

      await authAPI.register(userData);

      Alert.alert(
        "Inscription réussie", 
        "Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.",
        [
          {
            text: "Se connecter",
            onPress: () => router.replace("/connexion")
          }
        ]
      );
    } catch (error) {
      const errorMessage = handleAPIError(error);
      Alert.alert("Erreur d'inscription", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>Créez votre compte</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Votre nom"
              value={formData.nom}
              onChangeText={(value) => updateFormData('nom', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Votre prénom"
              value={formData.prenom}
              onChangeText={(value) => updateFormData('prenom', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom d'utilisateur</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Nom d'utilisateur unique"
              value={formData.username}
              onChangeText={(value) => updateFormData('username', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Numéro de téléphone *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="+226 12345678"
              keyboardType="phone-pad"
              value={formData.phone_number}
              onChangeText={(value) => updateFormData('phone_number', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email (optionnel)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="votre@email.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Au moins 6 caractères"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Répétez votre mot de passe"
              secureTextEntry={true}
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              editable={!isLoading}
            />
          </View>

          <Text style={styles.linkText}>
            Déjà un compte ?{" "}
            <Link href="/connexion" style={styles.link}>
              Connexion
            </Link>
          </Text>

          <Pressable
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>S'inscrire</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
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
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
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
