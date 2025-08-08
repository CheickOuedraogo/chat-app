import axios from 'axios';
import { storage } from './storage';

// Configuration de la base URL pour l'API
export const API_BASE_URL = 'http://192.168.56.2:5050';

// Instance axios configurée
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT automatiquement
apiClient.interceptors.request.use(
  async (config) => {
    // Récupérer le token depuis AsyncStorage
    const token = await storage.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      // Rediriger vers la page de connexion
      console.log('Token expiré, redirection vers la connexion');
      await storage.removeAuthToken();
    }
    return Promise.reject(error);
  }
);

// Fonctions utilitaires pour l'authentification
export const authAPI = {
  // Inscription
  register: async (userData: {
    username: string;
    nom: string;
    prenom: string;
    phone_number: string;
    password: string;
    email?: string;
  }) => {
    const response = await apiClient.post('/api/user', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials: {
    phone_number: string;
    password: string;
  }) => {
    const response = await apiClient.post('/api/user/connexion', credentials);
    return response.data;
  },

  // Récupérer les informations utilisateur
  getUserInfo: async (userId: string) => {
    const response = await apiClient.get(`/api/user/id/${userId}`);
    return response.data;
  },

  // Rechercher des utilisateurs
  searchUsers: async (searchTerm?: string) => {
    const params = searchTerm ? { search: searchTerm } : {};
    const response = await apiClient.get('/api/user', { params });
    return response.data;
  },
};

// Fonctions utilitaires pour les rooms
export const roomAPI = {
  // Créer une room
  createRoom: async (participantId: number) => {
    const response = await apiClient.post('/api/room', { participant: participantId });
    return response.data;
  },

  // Récupérer la liste des rooms
  getRooms: async () => {
    const response = await apiClient.get('/api/room');
    return response.data;
  },

  // Supprimer/quitter une room
  deleteRoom: async (roomId: string) => {
    const response = await apiClient.delete(`/api/room/${roomId}`);
    return response.data;
  },
};

// Fonctions utilitaires pour les messages
export const chatAPI = {
  // Récupérer les messages d'une room
  getMessages: async (roomId: string, page: number = 1, limit: number = 50) => {
    const response = await apiClient.get(`/api/chat/${roomId}`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Envoyer un message
  sendMessage: async (roomId: string, message: string) => {
    const response = await apiClient.post('/api/chat', {
      roomId,
      message
    });
    return response.data;
  },

  // Modifier un message
  editMessage: async (messageId: string, message: string) => {
    const response = await apiClient.put(`/api/chat/${messageId}`, {
      message
    });
    return response.data;
  },

  // Supprimer un message
  deleteMessage: async (messageId: string) => {
    const response = await apiClient.delete(`/api/chat/${messageId}`);
    return response.data;
  },

  // Mettre à jour l'état d'un message (accusé de réception)
  updateMessageState: async (messageId: string, state: 'send' | 'receive' | 'read') => {
    const response = await apiClient.patch(`/api/chat/${messageId}/state`, {
      state
    });
    return response.data;
  },

  // Rechercher des messages
  searchMessages: async (roomId: string, query: string) => {
    const response = await apiClient.get(`/api/chat/${roomId}/search`, {
      params: { q: query }
    });
    return response.data;
  },
};

// Gestion des erreurs
export const handleAPIError = (error: any) => {
  if (error.response) {
    // Erreur de réponse du serveur
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return `Erreur de requête: ${data.error || 'Données invalides'}`;
      case 401:
        return 'Non autorisé. Veuillez vous reconnecter.';
      case 403:
        return 'Accès interdit.';
      case 404:
        return 'Ressource non trouvée.';
      case 409:
        return `Conflit: ${data.error || 'Ressource déjà existante'}`;
      case 500:
        return 'Erreur serveur. Veuillez réessayer plus tard.';
      default:
        return `Erreur ${status}: ${data.error || 'Erreur inconnue'}`;
    }
  } else if (error.request) {
    // Erreur de réseau
    return 'Erreur de connexion. Vérifiez votre connexion internet.';
  } else {
    // Autre erreur
    return 'Une erreur inattendue s\'est produite.';
  }
};

// Types TypeScript pour les réponses API
export interface User {
  id: number;
  username: string;
  nom: string;
  prenom: string;
  phone_number: string;
  email?: string;
  created_at: string;
}

export interface Room {
  id: number;
  participant: User;
  created_at: string;
}

export interface Message {
  id: number;
  roomId: number;
  sender: User;
  message: string;
  state: 'send' | 'receive' | 'read';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
