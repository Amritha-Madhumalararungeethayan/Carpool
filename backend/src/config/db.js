const mongoose = require("mongoose");
const connectDB =async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log("MongoDB connected");
    }
    catch(err){
    console.log("MongoDB connection Error", err.message);
    console.log("URI  used:", process.env.MONGO_URI);

    }
}


module.exports = connectDB ; 