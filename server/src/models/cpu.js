import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cpuSchema = new Schema({
    name: String,
    brand: String,
    launchDate: String,
    generation: String
})

const Cpu = mongoose.model('Cpu', cpuSchema);

export default Cpu;