import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listRouter from './routes/list.ts';
import db from './database/connection.ts';
import userRouter from './routes/users.ts';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

app.use('/list', listRouter);

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
