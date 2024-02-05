import express from 'express';
import mongoose, { mongo } from 'mongoose';
import fs from 'fs';
import Cpu from '../src/models/cpu.js';

const app = express();
const port = 3001;

const mongoPasswordPath = '../server/confidential/mongopassword.txt';

const uri = fs.readFileSync(mongoPasswordPath, 'utf8');

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'erro de conexão do mongoDB'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

const newCpu = new Cpu({
    name: 'Ryzen 5 5600',
    brand: 'AMD',
    launchDate: '2020',
    generation: '5000'
})

newCpu.save();

app.get('/teste', (req, res) => {
    res.send('teste');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})