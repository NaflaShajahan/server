const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taxiSchema = new Schema({
    name: {type:String},
    regNumber:{type:String},
    driver:{type:String}
})

let taxi = mongoose.model("taxi", taxiSchema);
module.exports = taxi;