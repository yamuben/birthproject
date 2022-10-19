const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: true,
    trim: true,
    maxLength: [50, "name can not be more than 50 characters"],
  },
  dateOfBirth:String,
  address: {
    type: String,
    required: [true, "please add address"],
  },
  weight:String,
  parents:Array,
  doctor:String,
  registeredBy:String,
  HospitalName:String,
  bloodType:String,
  comments:String,
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.Now,
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

module.exports = mongoose.model('Child', ChildSchema);
