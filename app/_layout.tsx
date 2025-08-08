
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { storage } from "./utils/storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await storage.isAuthenticated();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Routes authentifiées
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="conversation" options={{ headerShown: false }} />
        </>
      ) : (
        // Routes non authentifiées
        <>
          <Stack.Screen name="connexion" options={{ headerShown: false }} />
          <Stack.Screen name="connexion/inscription" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
  },
});
