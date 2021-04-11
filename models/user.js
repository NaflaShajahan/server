const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String},
  password: {type: String},
  confirm_password: {type: String},
  name: {type: String},
  phoneNumber: {type: Number},
  address:{type: String},
  type:{type:Number}, //0-> admin,1->driver->2->rider
  driver_id:{type:String},
  date:{type:Date},
  isActive:{type:Number}
});

let user = mongoose.model("user", userSchema);
module.exports = user;
