const express = require('express');
const cors = require('cors');
const db = require('./firebaseConfig'); // Importa a configuração do Firebase

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Rotas CRUD para produtos

// Listar produtos
app.get('/produtos', async (req, res) => {
  const snapshot = await db.collection('produtos').get();
  const produtos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(produtos);
});

// Adicionar produto
app.post('/produtos', async (req, res) => {
  const produto = req.body;
  const docRef = await db.collection('produtos').add(produto);
  res.json({ id: docRef.id, ...produto });
});

// Atualizar produto
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;  // Pega o ID do produto a ser atualizado
    const produtoAtualizado = req.body;  // Pega os dados enviados no corpo da requisição

    try {
        // Verifica se o corpo da requisição não está vazio
        if (Object.keys(produtoAtualizado).length === 0) {
            return res.status(400).json({ message: 'Nenhum dado para atualizar foi enviado' });
        }

        // Atualiza o documento no Firestore
        await db.collection('produtos').doc(id).update(produtoAtualizado);

        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
});

// Deletar produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('produtos').doc(id).delete();
  res.json({ message: 'Produto removido' });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
