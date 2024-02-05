import express from 'express';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import Cpu from '../src/models/cpu.js';

const app = express();
const port = 3001;
const mongoPasswordPath = '../server/confidential/mongopassword.txt';
const uri = fs.readFileSync(mongoPasswordPath, 'utf8');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'erro de conexão do mongoDB'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

app.get('/teste', async (req, res) => {
    const cpus = await db.collection('cpus').find({}).toArray();
    res.json(cpus);
    console.log(cpus);
});

app.post('/post', async (req, res) => {
    try {
        const newCpu = new Cpu(req.body);
        await newCpu.save();
        res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
});

app.put('/update/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const updatedCpu = await Cpu.findByIdAndUpdate(id, req.body, {new: true});
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const updatedCpu = await Cpu.findByIdAndDelete(id, req.body, {new: true});
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})