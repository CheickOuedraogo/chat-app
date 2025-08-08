import AsyncStorage from '@react-native-async-storage/async-storage';

// Clés de stockage
const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  ROOMS_DATA: 'roomsData',
  MESSAGES_DATA: 'messagesData',
} as const;

// Interface pour les données utilisateur
export interface StoredUserData {
  id: number;
  username: string;
  nom: string;
  prenom: string;
  phone_number: string;
  email?: string;
}

// Fonctions de gestion du stockage
export const storage = {
  // Sauvegarder le token d'authentification
  setAuthToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du token:', error);
    }
  },

  // Récupérer le token d'authentification
  getAuthToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return null;
    }
  },

  // Supprimer le token d'authentification
  removeAuthToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Erreur lors de la suppression du token:', error);
    }
  },

  // Sauvegarder les données utilisateur
  setUserData: async (userData: StoredUserData): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données utilisateur:', error);
    }
  },

  // Récupérer les données utilisateur
  getUserData: async (): Promise<StoredUserData | null> => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  },

  // Supprimer les données utilisateur
  removeUserData: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Erreur lors de la suppression des données utilisateur:', error);
    }
  },

  // Sauvegarder les rooms
  setRoomsData: async (rooms: any[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ROOMS_DATA, JSON.stringify(rooms));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des rooms:', error);
    }
  },

  // Récupérer les rooms
  getRoomsData: async (): Promise<any[] | null> => {
    try {
      const roomsData = await AsyncStorage.getItem(STORAGE_KEYS.ROOMS_DATA);
      return roomsData ? JSON.parse(roomsData) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération des rooms:', error);
      return null;
    }
  },

  // Sauvegarder les messages d'une room
  setMessagesData: async (roomId: string, messages: any[]): Promise<void> => {
    try {
      const key = `${STORAGE_KEYS.MESSAGES_DATA}_${roomId}`;
      await AsyncStorage.setItem(key, JSON.stringify(messages));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des messages:', error);
    }
  },

  // Récupérer les messages d'une room
  getMessagesData: async (roomId: string): Promise<any[] | null> => {
    try {
      const key = `${STORAGE_KEYS.MESSAGES_DATA}_${roomId}`;
      const messagesData = await AsyncStorage.getItem(key);
      return messagesData ? JSON.parse(messagesData) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      return null;
    }
  },

  // Nettoyer toutes les données (déconnexion)
  clearAllData: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.ROOMS_DATA,
      ]);
      
      // Supprimer toutes les clés de messages
      const keys = await AsyncStorage.getAllKeys();
      const messageKeys = keys.filter(key => key.startsWith(STORAGE_KEYS.MESSAGES_DATA));
      if (messageKeys.length > 0) {
        await AsyncStorage.multiRemove(messageKeys);
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage des données:', error);
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return token !== null;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      return false;
    }
  },
};

// Hook personnalisé pour gérer l'état d'authentification
export const useAuth = () => {
  const login = async (token: string, userData: StoredUserData) => {
    await storage.setAuthToken(token);
    await storage.setUserData(userData);
  };

  const logout = async () => {
    await storage.clearAllData();
  };

  const checkAuth = async () => {
    return await storage.isAuthenticated();
  };

  return {
    login,
    logout,
    checkAuth,
  };
};
