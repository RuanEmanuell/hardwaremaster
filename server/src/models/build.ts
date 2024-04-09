import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const buildSchema = new Schema({
    //General info
    userId: String,
    cpuId: String,
    gpuId: String,
    moboId: String,
    ramId: String,
    powerId: String,
    ssdId: String,
    caseId: String,
    ramQuantity: Number,
    ssdQuantity: Number,
    buildName: String
})

const Build = mongoose.model('build', buildSchema);

export default Build;