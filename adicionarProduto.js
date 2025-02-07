const db = require('./firebaseConfig'); // Importa a configuração do Firebase

const produto = {
  nome: 'Arroz',
  categoria: 'Alimentos',
  preco: 10.50
};

// Função para adicionar produto
const adicionarProduto = async () => {
  try {
    const docRef = await db.collection('produtos').add(produto);
    console.log(`Produto adicionado com ID: ${docRef.id}`);
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
  }
};

adicionarProduto(); // Chama a função para adicionar o produto
