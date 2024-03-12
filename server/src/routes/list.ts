import { Router } from 'express';
import mongoose from 'mongoose';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Part from '../models/part.ts';
import db from '../database/connection.ts';

const listRouter = Router();

listRouter.get('/parts', async (req, res) => {
  try {
    const parts = await db.collection('parts').find({}).toArray();
    res.json(parts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
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
  } catch (err) {
    console.log(err);
  }
});

listRouter.delete('/delete/:partId', async (req, res) => {
  const id = req.params.partId;
  try {
    await Part.findByIdAndDelete(id, req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

listRouter.get('/currentprice/:partId', async (req, res) => {
  const id = req.params.partId;
  const selectedPart: mongoose.mongo.WithId<mongoose.AnyObject> | null = await db.collection('parts').findOne({ "_id": new mongoose.Types.ObjectId(id) });

  puppeteer.use(StealthPlugin());
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

        if (partLink.includes('pichau')) {
          let possibleDivs = ['.jss258', '.jss266', '.jss267', '.jss272'];

          for (let i = 0; i < possibleDivs.length; i++) {
            if (await page.$(possibleDivs[i])) {
              let temporaryPriceLink = '0.0';
              temporaryPriceLink = await page.$eval(possibleDivs[i], (div) => (div as HTMLElement).innerText.substring(3));
              if (temporaryPriceLink.length < 15) {
                priceLink = temporaryPriceLink;
              }
            }
          }
        } else if (partLink.includes('kabum')) {
          if (await page.$('.sc-5492faee-2.ipHrwP.finalPrice')) {
            priceLink = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', (h4) => (h4 as HTMLElement).innerText.substring(3));
          }
        } else if (partLink.includes('terabyte')) {
          if (await page.$('#valVista')) {
            priceLink = await page.$eval('#valVista', (p) => (p as HTMLElement).innerText.substring(3));
          }
        } else if (partLink.includes('amazon')) {
          if (await page.$('.a-offscreen')) {
            priceLink = await page.$eval('.a-offscreen', (span) => (span as HTMLElement).innerText.substring(2));
          }
        }

        priceLink = priceLink.replace('.', '');

        if (parseFloat(priceLink) != parseFloat(currentPrice) && parseFloat(priceLink) > 0) {
          currentPrice = priceLink;
        }
      }
    }

    page.close();

    return currentPrice;
  }

  if (selectedPart !== null) {
    price = await choosePrice([selectedPart['shopLink'], selectedPart['shopLink2'], selectedPart['shopLink3']]);

    if (price != selectedPart['price']) {
      res.json({ newPrice: price, newBestLink: selectedPart['shopLink'] });
    } else {
      res.json({ newPrice: price, newBestLink: selectedPart['shopLink'] });
      console.log('Mesmo preço!');
    }
  }
});

export default listRouter;
