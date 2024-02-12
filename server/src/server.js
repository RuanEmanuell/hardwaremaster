import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import puppeteer from 'puppeteer';
import Part from './models/part.js';

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

app.get('/list', async (req, res) => {
    const parts = await db.collection('parts').find({}).toArray();
    res.json(parts);
});

app.post('/post', async (req, res) => {
    try {
        const newPart = new Part(req.body);
        await newPart.save();
        res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPart = await Part.findByIdAndUpdate(id, req.body);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPart = await Part.findByIdAndDelete(id, req.body, { new: true });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

app.get('/currentprice/:id', async (req, res) => {
    const { id } = req.params;
    const selectedPart = await db.collection('parts').findOne({ "_id": new mongoose.Types.ObjectId(id) });

    const browserPromise = puppeteer.launch();
    const browser = await browserPromise;

    let price = selectedPart['price'];

    async function choosePrice(partLinks) {
        let currentPrice = price;
        let priceLink = 0.0;
        const page = await browser.newPage();
        for (const partLink of partLinks) {
            if (partLink != '') {
                await page.goto(partLink);
                if (await page.$('.sc-5492faee-2.ipHrwP.finalPrice')) {
                    priceLink = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', (h4) => parseFloat(h4.innerText.substring(3).replaceAll(',', '.')));
                } else if (await page.$('#valVista')) {
                    priceLink = await page.$eval('#valVista', (p) => parseFloat(p.innerText.substring(3).replaceAll(',', '.')));
                } else if (await page.$('.jss272')) {
                    priceLink = await page.$eval('.jss272', (div) => parseFloat(div.innerText.substring(3).replaceAll(',', '.')));
                }
            }

            if (priceLink != currentPrice && priceLink > 0.0) {
                currentPrice = priceLink
            }    

        }
        return currentPrice;
    }

    price = await choosePrice([selectedPart['shopLink'], selectedPart['shopLink2'], selectedPart['shopLink3']]);

    if (price != selectedPart['price']) {
        res.json({ preço: price });
    } else {
        console.log('Mesmo preço!');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})