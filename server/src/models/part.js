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
    price: String,
    costBenefit: Number,
    launch: Number,
    //CPU only
    cpuSocket: String,
    cpuGeneration: String,
    cpuCores: Number,
    cpuThreads: Number,
    cpuFrequency: Number,
    cpuIgpu: Boolean,
    cpuPerformance:Number,
    igpuPerformance:Number,
    //GPU only
    gpuCores: Number,
    gpuGeneration: String,
    gpuMemory: Number,
    gpuMemoryType: String,
    gpuMemoryBus: Number,
    gpuPerformance: Number,
    //MOBO only
    moboChipset: String,
    moboSocketCompatibility: String,
    moboRamCompatibility: String,
    moboSlots: Number,
    //RAM only
    ramFrequency: Number,
    ramCapacity: Number,
    ramType: String,
    ramLatency: String,
    //POWER SUPPLY only
    powerWatts: Number,
    powerEfficiency: String,
    powerModular: String,
    //SSD only
    ssdCapacity: Number,
    ssdType: String,
    ssdSpeed: Number,
    //CASE only
    caseForm: String,
    caseFanSupport: String,
    caseWcSupport: String
})

const Cpu = mongoose.model('Part', partSchema);

export default Cpu;