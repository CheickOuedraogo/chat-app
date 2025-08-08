import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable, Alert, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import RoomBox from './roomBox'
import { roomAPI, handleAPIError } from '../utils/requete';
import { storage } from '../utils/storage';

const RoomIndex = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadRooms = async () => {
    try {
      const roomsData = await roomAPI.getRooms();
      setRooms(roomsData);
      // Sauvegarder les rooms localement
      await storage.setRoomsData(roomsData);
    } catch (error) {
      const errorMessage = handleAPIError(error);
      Alert.alert("Erreur", errorMessage);
      
      // Essayer de charger les données en cache
      const cachedRooms = await storage.getRoomsData();
      if (cachedRooms) {
        setRooms(cachedRooms);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    loadRooms();
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInHours < 48) {
      return "Hier";
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  const handleRoomPress = (room: any) => {
    // Navigation vers la conversation
    console.log('Navigation vers la room:', room.id);
    // TODO: Implémenter la navigation vers la conversation
  };

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Contacts</Text>
              <View style={styles.headerActions}>
                <Pressable style={styles.headerButton}>
                  <Ionicons name="search" size={24} color="#007AFF" />
                </Pressable>
                <Pressable style={styles.headerButton}>
                  <Ionicons name="add" size={24} color="#007AFF" />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Chargement des contacts...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Contacts</Text>
            <View style={styles.headerActions}>
              <Pressable style={styles.headerButton}>
                <Ionicons name="search" size={24} color="#007AFF" />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Ionicons name="add" size={24} color="#007AFF" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Contacts List */}
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleRoomPress(item)}>
              <RoomBox 
                username={`${item.participant.prenom} ${item.participant.nom}`}
                lastMessage={item.lastMessage || "Aucun message"}
                date={new Date(item.created_at)}
                numero={item.participant.phone_number}
                formattedDate={formatDate(item.created_at)}
              />
            </Pressable>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={64} color="#C7C7CC" />
              <Text style={styles.emptyTitle}>Aucun contact</Text>
              <Text style={styles.emptySubtitle}>Commencez une conversation en ajoutant des contacts</Text>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  listContainer: {
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#8E8E93",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8E8E93",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#C7C7CC",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default RoomIndex;
