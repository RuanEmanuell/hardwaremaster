import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    //General info
    email: String,
    name: String,
    photo: String,
    builds: String
})

const User = mongoose.model('User', userSchema);

export default User;