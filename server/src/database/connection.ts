import mongoose, { Connection } from 'mongoose';

require('dotenv').config();

mongoose.connect(process.env.MONGO_PASSWORD!);

const db : Connection = mongoose.connection;

export default db;