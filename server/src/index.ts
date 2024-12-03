import express from 'express';
import cors from 'cors';
import Srvr from './controllers';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';


const app = express();

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000,
    max: 40,
  });

app.use(limiter);


const logStream = fs.createWriteStream(
  path.join(__dirname, '/../logs/access.log'),
  { flags: 'a' }
);

const logger = morgan('combined', {
  stream: logStream,
});

app.use(logger);

app.use(cors());

app.use(express.json()); 

app.post('/api/obterEstado', Srvr.getEstado);

// app.post('/api/obterDistancia', Srvr.getDistancia)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
