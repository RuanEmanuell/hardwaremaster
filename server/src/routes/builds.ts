import { Router } from 'express';
import mongoose from 'mongoose';
import db from '../database/connection.ts';
import Build from '../models/build.ts';
import { Types } from 'mongoose';
const { ObjectId } = Types;

const buildRouter = Router();

buildRouter.get('/users/:userId', async (req, res) => {
  try{
    const userId = req.params.userId;
    const builds = await db.collection('builds').find({userId: userId}).toArray();
    res.json(builds);
  }catch(err){
    console.log(err);
  }
});

buildRouter.get('/:buildId', async (req, res) => {
  try{
    const buildId = req.params.buildId;
    const build = await db.collection('builds').findOne({_id: new ObjectId(buildId)});
    res.json(build);
  }catch(err){
    console.log(err);
  }
});

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

buildRouter.delete('/delete/:buildId', async(req, res) => {
  const buildId = req.params.buildId
  try {
    await Build.findByIdAndDelete(buildId, req.body);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
})

export default buildRouter;