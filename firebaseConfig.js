const admin = require('firebase-admin');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db; // Exporta o banco de dados para ser usado em outros arquivos
