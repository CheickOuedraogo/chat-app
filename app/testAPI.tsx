import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { testIntegration, quickTest, cleanupTestData } from './utils/testAPI';
import { authAPI, roomAPI, chatAPI } from './utils/requete';

const TestAPIScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runQuickTest = async () => {
    setIsLoading(true);
    addResult('🔍 Test rapide de connexion...');
    
    try {
      const connected = await quickTest();
      if (connected) {
        addResult('✅ Serveur accessible');
      } else {
        addResult('❌ Serveur inaccessible');
      }
    } catch (error) {
      addResult(`❌ Erreur: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const runFullTest = async () => {
    setIsLoading(true);
    addResult('🧪 Début des tests complets...');
    
    try {
      const success = await testIntegration();
      if (success) {
        addResult('🎉 Tous les tests sont passés !');
      } else {
        addResult('❌ Certains tests ont échoué');
      }
    } catch (error) {
      addResult(`❌ Erreur: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    addResult('🔐 Test de connexion...');
    
    try {
      const response = await authAPI.login({
        phone_number: "+33123456789",
        password: "password123"
      });
      addResult('✅ Connexion réussie');
      addResult(`Token: ${response.token ? 'Présent' : 'Absent'}`);
    } catch (error) {
      addResult(`❌ Erreur de connexion: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testRooms = async () => {
    setIsLoading(true);
    addResult('🏠 Test de récupération des rooms...');
    
    try {
      const rooms = await roomAPI.getRooms();
      addResult(`✅ ${rooms.length} rooms récupérées`);
    } catch (error) {
      addResult(`❌ Erreur rooms: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const cleanup = async () => {
    setIsLoading(true);
    addResult('🧹 Nettoyage des données...');
    
    try {
      await cleanupTestData();
      addResult('✅ Nettoyage terminé');
    } catch (error) {
      addResult(`❌ Erreur nettoyage: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Test API</Text>
        <Text style={styles.subtitle}>Vérification de l'intégration backend</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.primaryButton]} 
          onPress={runQuickTest}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Rapide</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.secondaryButton]} 
          onPress={runFullTest}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Complet</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.testButton]} 
          onPress={testLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Connexion</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.testButton]} 
          onPress={testRooms}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Test Rooms</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.cleanupButton]} 
          onPress={cleanup}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Nettoyer</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.clearButton]} 
          onPress={clearResults}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Effacer Résultats</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Résultats des tests:</Text>
        {testResults.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            {result}
          </Text>
        ))}
        {testResults.length === 0 && (
          <Text style={styles.noResults}>Aucun test exécuté</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "#34C759",
  },
  testButton: {
    backgroundColor: "#FF9500",
  },
  cleanupButton: {
    backgroundColor: "#FF3B30",
  },
  clearButton: {
    backgroundColor: "#8E8E93",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
  },
  resultText: {
    fontSize: 14,
    color: "#1C1C1E",
    marginBottom: 4,
    fontFamily: "monospace",
  },
  noResults: {
    fontSize: 16,
    color: "#8E8E93",
    fontStyle: "italic",
  },
});

export default TestAPIScreen;
