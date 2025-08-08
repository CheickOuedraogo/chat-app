import { testServerConnection, apiTest } from './apiTest';

// Fonction pour tester l'intégration complète
export const testIntegration = async () => {
  console.log('🧪 Début des tests d\'intégration...');
  
  try {
    // 1. Test de connexion au serveur
    console.log('1. Test de connexion au serveur...');
    const serverConnected = await testServerConnection();
    if (!serverConnected) {
      console.log('❌ Serveur inaccessible');
      return false;
    }
    console.log('✅ Serveur accessible');

    // 2. Test d'inscription
    console.log('2. Test d\'inscription...');
    await apiTest.testRegister();
    console.log('✅ Inscription réussie');

    // 3. Test de connexion
    console.log('3. Test de connexion...');
    await apiTest.testLogin();
    console.log('✅ Connexion réussie');

    // 4. Test de récupération des rooms
    console.log('4. Test de récupération des rooms...');
    await apiTest.testGetRooms();
    console.log('✅ Rooms récupérées');

    console.log('🎉 Tous les tests sont passés avec succès !');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    return false;
  }
};

// Fonction pour tester uniquement la connexion
export const quickTest = async () => {
  console.log('🔍 Test rapide de connexion...');
  const connected = await testServerConnection();
  if (connected) {
    console.log('✅ Serveur accessible - Prêt pour les tests');
  } else {
    console.log('❌ Serveur inaccessible - Vérifiez la configuration');
  }
  return connected;
};

// Fonction pour nettoyer les données de test
export const cleanupTestData = async () => {
  console.log('🧹 Nettoyage des données de test...');
  try {
    await apiTest.testLogout();
    console.log('✅ Données nettoyées');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  }
};
