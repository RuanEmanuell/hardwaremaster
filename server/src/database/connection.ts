import mongoose, { Connection } from 'mongoose';

require('dotenv').config();

const uri = process.env.MONGO_PASSWORD!;

mongoose.connect(uri);

const db : Connection = mongoose.connection;

console.log(process.env.MONGO_PASSWORD!);

export default db;