import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import puppeteer from 'puppeteer';
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
    const { id } = req.params;
    try {
        const updatedCpu = await Cpu.findByIdAndUpdate(id, req.body, { new: true });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCpu = await Cpu.findByIdAndDelete(id, req.body, { new: true });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

app.get('/currentprice/:id', async (req, res) => {
    const { id } = req.params;
    const selectedCpu = await db.collection('cpus').findOne({ "_id": new mongoose.Types.ObjectId(id) });

    const browserPromise = puppeteer.launch();
    const browser = await browserPromise;

    let price = selectedCpu['price'];

    async function choosePrice(cpuLinks){
        let currentPrice = price;
        let priceLink = 0.0;
        const page = await browser.newPage();
        for(const cpuLink of cpuLinks){
            await page.goto(cpuLink);
            if (await page.$('.sc-5492faee-2.ipHrwP.finalPrice')) {
                priceLink = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', (h4) => parseFloat(h4.innerText.substring(3).replaceAll(',', '.')));
            }else if(await page.$('#valVista')){
                priceLink = await page.$eval('#valVista', (p) => parseFloat(p.innerText.substring(3).replaceAll(',', '.')));
            }else if(await page.$('.jss272')){
                priceLink = await page.$eval('.jss272', (div) => parseFloat(div.innerText.substring(3).replaceAll(',', '.')));
            }
    
        }

        if(priceLink != currentPrice && priceLink > 0.0){
            currentPrice = priceLink
        }

        return currentPrice;
    }

    price = await choosePrice([selectedCpu['shopLink'], selectedCpu['shopLink2'], selectedCpu['shopLink3']]);

    if (price != selectedCpu['price']) {
        res.json({ preço: price });
    } else {
        console.log('Mesmo preço!');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})