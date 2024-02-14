import {Router} from 'express';
import mongoose from 'mongoose';
import puppeteer from 'puppeteer';
import Part from '../models/part.js';
import db from '../database/connection.js';

const listRouter = Router();

listRouter.get('/parts', async (req, res) => {
    const parts = await db.collection('parts').find({}).toArray();
    res.json(parts);
});

listRouter.post('/post', async (req, res) => {
    try {
        const newPart = new Part(req.body);
        await newPart.save();
        res.sendStatus(201)
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
});

listRouter.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPart = await Part.findByIdAndUpdate(id, req.body);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

listRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPart = await Part.findByIdAndDelete(id, req.body, { new: true });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
    }
});

listRouter.get('/currentprice/:id', async (req, res) => {
    const { id } = req.params;
    const selectedPart = await db.collection('parts').findOne({ "_id": new mongoose.Types.ObjectId(id) });

    const browserPromise = puppeteer.launch();
    const browser = await browserPromise;

    let price = selectedPart['price'];

    async function choosePrice(partLinks) {
        let currentPrice = '0.0';  
        const page = await browser.newPage();
      
        for (const partLink of partLinks) {
          if (partLink !== '') {
            await page.goto(partLink);
      
            let priceLink = '0.0';  
            
            if (await page.$('.sc-5492faee-2.ipHrwP.finalPrice')) {
              priceLink = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', (h4) => h4.innerText.substring(3));
            } else if (await page.$('#valVista')) {
              priceLink = await page.$eval('#valVista', (p) => p.innerText.substring(3));
            } else if (await page.$('.jss272')) {
              priceLink = await page.$eval('.jss272', (div) => div.innerText.substring(3));
            }
      
            if (priceLink !== currentPrice && parseFloat(priceLink) > 0.0) {
              currentPrice = priceLink;
            }
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

export default listRouter;
