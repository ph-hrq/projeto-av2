// Importa as bibliotecas
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Inicializa o servidor
const app = express();
const PORTA = process.env.PORT || 3000;

// Configuração importante — CORS
app.use(cors());
app.use(express.json()); // Para receber dados em JSON

// Conecta com o Supabase
const supabaseUrl = 'https://mqcuotjechlvgmprtuob.supabase.co';
const supabaseKey = 'sb_publishable_x1DGowbRR400Lqt6YdB1sQ_NM-iLL53';
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Exemplo de rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: '✅ Servidor está funcionando!' });
});

// ✅ Exemplo: Buscar dados
app.get('/dados', async (req, res) => {
  try {
    const { data, error } = await supabase.from('sua_tabela').select('*');
    if (error) throw error;
    res.json(data);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// Inicia o servidor
app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});