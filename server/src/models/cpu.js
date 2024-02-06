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
    igpu: Boolean,
    price: Number,
    performance: Number,
    igpuPerformance: Number,
    costBenefit: Number,
    shopLink: String,
    shopLink2: String,
    shopLink3: String,
    imageLink: String
})

const Cpu = mongoose.model('Cpu', cpuSchema);

export default Cpu;