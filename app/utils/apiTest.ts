import { authAPI, roomAPI, chatAPI, handleAPIError } from './requete';
import { storage } from './storage';

// Exemple d'utilisation de l'API
export const apiTest = {
  // Test d'inscription
  testRegister: async () => {
    try {
      const userData = {
        username: "testuser",
        nom: "Test",
        prenom: "User",
        phone_number: "+33123456789",
        password: "password123",
        email: "test@example.com"
      };

      const response = await authAPI.register(userData);
      console.log('Inscription réussie:', response);
      return response;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur d\'inscription:', errorMessage);
      throw error;
    }
  },

  // Test de connexion
  testLogin: async () => {
    try {
      const credentials = {
        phone_number: "+33123456789",
        password: "password123"
      };

      const response = await authAPI.login(credentials);
      console.log('Connexion réussie:', response);

      // Sauvegarder le token et les données utilisateur
      if (response.token && response.user) {
        await storage.setAuthToken(response.token);
        await storage.setUserData(response.user);
        console.log('Token et données utilisateur sauvegardés');
      }

      return response;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur de connexion:', errorMessage);
      throw error;
    }
  },

  // Test de récupération des rooms
  testGetRooms: async () => {
    try {
      const rooms = await roomAPI.getRooms();
      console.log('Rooms récupérées:', rooms);
      
      // Sauvegarder les rooms localement
      await storage.setRoomsData(rooms);
      
      return rooms;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur lors de la récupération des rooms:', errorMessage);
      throw error;
    }
  },

  // Test de création de room
  testCreateRoom: async (participantId: number) => {
    try {
      const room = await roomAPI.createRoom(participantId);
      console.log('Room créée:', room);
      return room;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur lors de la création de room:', errorMessage);
      throw error;
    }
  },

  // Test d'envoi de message
  testSendMessage: async (roomId: string, message: string) => {
    try {
      const sentMessage = await chatAPI.sendMessage(roomId, message);
      console.log('Message envoyé:', sentMessage);
      return sentMessage;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur lors de l\'envoi du message:', errorMessage);
      throw error;
    }
  },

  // Test de récupération des messages
  testGetMessages: async (roomId: string) => {
    try {
      const messages = await chatAPI.getMessages(roomId);
      console.log('Messages récupérés:', messages);
      
      // Sauvegarder les messages localement
      await storage.setMessagesData(roomId, messages);
      
      return messages;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur lors de la récupération des messages:', errorMessage);
      throw error;
    }
  },

  // Test de recherche d'utilisateurs
  testSearchUsers: async (searchTerm: string) => {
    try {
      const users = await authAPI.searchUsers(searchTerm);
      console.log('Utilisateurs trouvés:', users);
      return users;
    } catch (error) {
      const errorMessage = handleAPIError(error);
      console.error('Erreur lors de la recherche d\'utilisateurs:', errorMessage);
      throw error;
    }
  },

  // Test de déconnexion
  testLogout: async () => {
    try {
      await storage.clearAllData();
      console.log('Déconnexion réussie - toutes les données supprimées');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  },

  // Test complet du flux d'authentification
  testFullAuthFlow: async () => {
    try {
      console.log('=== Début du test complet ===');
      
      // 1. Test d'inscription
      console.log('1. Test d\'inscription...');
      await apiTest.testRegister();
      
      // 2. Test de connexion
      console.log('2. Test de connexion...');
      await apiTest.testLogin();
      
      // 3. Test de récupération des rooms
      console.log('3. Test de récupération des rooms...');
      await apiTest.testGetRooms();
      
      // 4. Test de recherche d'utilisateurs
      console.log('4. Test de recherche d\'utilisateurs...');
      await apiTest.testSearchUsers('test');
      
      console.log('=== Test complet terminé avec succès ===');
    } catch (error) {
      console.error('=== Erreur lors du test complet ===', error);
      throw error;
    }
  }
};

// Fonction pour tester la connexion au serveur
export const testServerConnection = async () => {
  try {
    const response = await fetch('http://192.168.56.2:5050/api/user');
    if (response.ok) {
      console.log('✅ Serveur accessible');
      return true;
    } else {
      console.log('❌ Serveur accessible mais erreur HTTP:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Serveur inaccessible:', error);
    return false;
  }
};
