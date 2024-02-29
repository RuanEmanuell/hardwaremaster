import {Router} from 'express';
import User from '../models/user';
import db from '../database/connection';

const userRouter = Router()

userRouter.get('/:authId', async (req, res) => {
  try {
    const authId = req.params.authId;
    const user = await db.collection('users').findOne({ authId: authId});
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

userRouter.post('/post', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default userRouter;