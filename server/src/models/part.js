import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const partSchema = new Schema({
    //General info
    type: String,
    name: String,
    brand: String,
    shopLink: String,
    shopLink2: String,
    shopLink3: String,
    imageLink: String,
    price: Number,
    costBenefit: Number,
    launch: Number,
    //Cpu only
    cpuGeneration: String,
    cpuCores: Number,
    cpuThreads: Number,
    cpuFrequency: Number,
    cpuIgpu: Boolean,
    cpuPerformance:Number,
    igpuPerformance:Number,
    //Gpu only
    gpuGeneration: String,
    gpuMemory: Number,
    gpuMemoryType: String,
    gpuMemoryBus: Number,
    gpuPerformance: Number
})

const Cpu = mongoose.model('Part', partSchema);

export default Cpu;