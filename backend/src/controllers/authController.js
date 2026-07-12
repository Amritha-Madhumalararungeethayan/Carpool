const User = require("../models/User");
const {hashPassword,comparepassword } = require("../services/hashService");
const {gentoken} = require('../services/jwt'); 

exports.register = async(req,res)=>{
    try {
        const {name , email , password} = req.body ; 
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        const hashedpassword = await hashPassword(password);
        const user = new User({name , email , password : hashedpassword}); 
        await user.save() ; 
        res.status(201).json({message : "User registered successfully"});
    }catch(err){
        res.status(500).json({error : err.message});
    };
}

exports.login = async(req,res)=>{
    try{
        const {email , password} = req.body ; 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Invalid email or password"});

        }
        if(user.isbanned)return res.status(403).json({message : "Account is Banned"});
        const isMatch = await comparepassword(password ,user.password,);
        if(!isMatch)
            return res.status(400).json({message : "Invalid email or password"});

        const token = gentoken({id : user._id , email : user.email });
        res.cookie("token",token,{
            httpOnly : true ,
            sameSite: "none",
            secure: true 
        })
        res.json({
            message: "login successful", token 
        })
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
};






exports.logout = async(req,res)=>{
res.clearCookie("token", {
  httpOnly : true ,
  sameSite: "none",
  secure: true
});
res.status(200).json({
    message : "logout successful"
})


}