import mongoose, { Connection } from 'mongoose';
import fs from 'fs';

const mongoPasswordPath = '../server/confidential/mongopassword.txt';
const uri : string = fs.readFileSync(mongoPasswordPath, 'utf8').trim();

mongoose.connect(uri);

const db : Connection = mongoose.connection;

export default db;