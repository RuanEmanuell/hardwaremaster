import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gpuSchema = new Schema({
    type: String,
    name: String,
    brand: String,
    launchDate: Number,
    generation: String,
    cores: Number,
    memory: Number,
    memoryType: String,
    memoryBus: Number,
    shopLink: String,
    shopLink2: String,
    shopLink3: String,
    imageLink: String,
    price: Number,
    performance: Number,
    costBenefit: Number,
})

const Gpu = mongoose.model('Gpu', gpuSchema);

export default Gpu;