import {Router} from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import db from '../database/connection';

const userRouter = Router();

userRouter.post('/post', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

export default userRouter;