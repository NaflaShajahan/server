const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({

    tripType: {type:String},
    bookedBy: {type:String},
    bookingNo: {type:String},
    address: {type:String},
    date: {type:Date},
    driver:{type:String},
    rider: {type:String},
    status: {type:Number},       //0->booked,1->completed,2->cancelled
    sourceLocation: {type:String},
    destination:{type:String},
    //taxi:{type:String}
})
let trip = mongoose.model("trip", tripSchema);
module.exports = trip;
