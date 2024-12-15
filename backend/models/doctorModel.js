import mongoose from "mongoose";
// using this model we can store data in database
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },  // if false doctor will not avaible
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default:{}},  //add doctor appointment data we will get to know when the slot is available
}, { minimize: false })  //to store empty object in any data

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);  // project start it wiil get executes and create doctormodel if it is already created use this unless create
export default doctorModel;