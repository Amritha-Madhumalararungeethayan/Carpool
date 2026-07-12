const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name :{type : String , required : true },
    from : {type : String , required : true }, 
    to : {type : String , required : true }, 
    time : {type :Date , required : true},
    total :{ type: Number, required: true },
    available :{ type: Number, required: true },
    cost:{ type: Number },
    notes:{type : String},
    status:{type : String,enum : ['active','cancelled','completed'],default:'active'},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
{timestamps :true});

module.exports = mongoose.model("Tripr" , tripSchema)
