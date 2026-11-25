const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// ===== COLE SEUS DADOS DO SUPABASE AQUI =====
const supabaseUrl = 'https://mqcuotjechlvgmprtuob.supabase.co';
const supabaseKey = 'sb_publishable_x1DGowbRR400Lqt6YdB1sQ_NM-iLL53';
// ============================================

const supabase = createClient(supabaseUrl, supabaseKey);

// Teste de conexão
app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor funcionando! 🚀' });
});

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
});

// Cadastrar novo usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;
  
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios!' });
  }

  const { data, error } = await supabase
    .from('usuarios')
    .insert({ nome, email })
    .select();
  
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data[0]);
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
});