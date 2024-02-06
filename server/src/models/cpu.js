import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cpuSchema = new Schema({
    name: String,
    brand: String,
    launchDate: Number,
    generation: String,
    cores: Number,
    threads: Number,
    frequency: Number,
    perfomance: Number,
    price: Number,
    shopLink: String,
    shopLink2: String,
    shopLink3: String,
    imageLink: String
})

const Cpu = mongoose.model('Cpu', cpuSchema);

export default Cpu;