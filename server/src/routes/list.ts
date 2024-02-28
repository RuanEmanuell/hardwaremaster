import { Router } from 'express';
import mongoose from 'mongoose';
import puppeteer from 'puppeteer';
import Part from '../models/part.ts';
import db from '../database/connection.ts';

const listRouter = Router();

listRouter.get('/parts', async (req, res) => {
  try{
    const parts = await db.collection('parts').find({}).toArray();
    res.json(parts);
  }catch(err){
    console.log(err);
  }
});

listRouter.post('/post', async (req, res) => {
  try {
    const newPart = new Part(req.body);
    await newPart.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

listRouter.put('/update/:partId', async (req, res) => {
  const id = req.params.partId;
  try {
    await Part.findByIdAndUpdate(id, req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

listRouter.delete('/delete/:partId', async (req, res) => {
  const id = req.params.partId;
  try {
    await Part.findByIdAndDelete(id, req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

listRouter.get('/currentprice/:partId', async (req, res) => {
  const id = req.params.partId;
  const selectedPart: mongoose.mongo.WithId<mongoose.AnyObject> | null = await db.collection('parts').findOne({ "_id": new mongoose.Types.ObjectId(id) });

  const browserPromise = puppeteer.launch();
  const browser = await browserPromise;

  let price: string;

  if (selectedPart !== null) {
    price = selectedPart['price'];
  }

  async function choosePrice(partLinks: Array<string>) {
    let currentPrice = price;
    const page = await browser.newPage();

    for (const partLink of partLinks) {
      if (partLink !== '') {
        await page.goto(partLink);

        let priceLink = '0.0';


        if (await page.$('.sc-5492faee-2.ipHrwP.finalPrice')) {
          priceLink = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', (h4) => (h4 as HTMLElement).innerText.substring(3));
        } else if (await page.$('#valVista')) {
          priceLink = await page.$eval('#valVista', (p) => (p as HTMLElement).innerText.substring(3));
        } else if (await page.$('.jss272')) {
          priceLink = await page.$eval('.jss272', (div) => (div as HTMLElement).innerText.substring(3));
        } else if (await page.$('.jss267')) {
          priceLink = await page.$eval('.jss267', (div) => (div as HTMLElement).innerText.substring(3));
        } else if (await page.$('.jss266')) {
          priceLink = await page.$eval('.jss266', (div) => (div as HTMLElement).innerText.substring(3));
        } else if (await page.$('.a-offscreen')) {
          priceLink = await page.$eval('.a-offscreen', (span) => (span as HTMLElement).innerText.substring(2));
        }

        if (parseInt(priceLink) < parseInt(currentPrice) && parseInt(priceLink) > 10) {
          currentPrice = priceLink;
        }
      }
    }

    return currentPrice;
  }

  if (selectedPart !== null) {
    price = await choosePrice([selectedPart['shopLink'], selectedPart['shopLink2'], selectedPart['shopLink3']]);

    if (price != selectedPart['price']) {
      res.json({ preço: price });
    } else {
      console.log('Mesmo preço!');
    }
  }
});

export default listRouter;
