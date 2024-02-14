import mongoose from 'mongoose';
import fs from 'fs';

const mongoPasswordPath = '../server/confidential/mongopassword.txt';
const uri = fs.readFileSync(mongoPasswordPath, 'utf8');

mongoose.connect(uri);

const db = mongoose.connection;

export default db;