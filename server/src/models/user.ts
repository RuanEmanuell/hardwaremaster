import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    //General info
    _id: String,
    type: String,
    email: String,
    name: String,
    photo: String,
})

const User = mongoose.model('User', userSchema);

export default User;