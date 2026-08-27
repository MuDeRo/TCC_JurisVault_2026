import express from 'express';
import path from 'path';
import router from './routes/routes.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'files')));

app.use('/', router);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});