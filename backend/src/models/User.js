const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{type : String , required : true },
    email : {type : String , required : true , unique : true}, 
    password : {type : String , required : false },
    googleId: {type :String , unique : true , sparse :true},
    resetlink :{type:String , default: ''},
    isbanned : {type:Boolean , default : false}
});

module.exports = mongoose.model("User" , userSchema)
