import express from 'express';
import Srvr from './controllers'; // Certifique-se de importar a classe corretamente

const app = express();

app.use(express.json()); // Para garantir que o corpo da requisição seja lido como JSON

app.post('/api/obterEstado', Srvr.getEstado);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
