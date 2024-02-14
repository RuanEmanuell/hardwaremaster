import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listRouter from './routes/list.js';
import db from './database/connection.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'erro de conexão do mongoDB'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

app.use('/list', listRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})