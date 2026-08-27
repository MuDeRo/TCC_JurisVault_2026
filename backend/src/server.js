import express from 'express'
import router from './routes/routes.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json())

app.use('/', router);


app.listen(process.env.SERVER_PORT || 8080,() =>{
    console.log(`Servidor rodando em https://localhost:${process.env.SERVER_PORT}`)
})  