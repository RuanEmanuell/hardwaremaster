import { Router } from 'express';
import mongoose from 'mongoose';
import db from '../database/connection.ts';
import Build from '../models/build.ts';

const buildRouter = Router();

buildRouter.post('/post', async (req, res) => {
  try {
    const newBuild = new Build(req.body);
    await newBuild.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}) 

export default buildRouter;