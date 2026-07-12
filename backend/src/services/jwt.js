const jwt = require("jsonwebtoken"); 

exports.gentoken = (payload)=>{
    return jwt.sign(payload , process.env.JWT_SECRET,{expiresIn:"1h"});
};

exports.verifytoken = (token)=>{
    return jwt.verify(token , process.env.JWT_SECRET);
};

exports.genpwdforgettoken = (payload)=>{
    return jwt.sign(payload , process.env.JWT_SECRET,{expiresIn:"10m"});
};
