const {verifytoken} = require("../services/jwt");

module.exports = (req,res,next)=>{

    const token = req.cookies?.token; 

    if(!token)

        return res.status(401).json({message:"Invalid token " });

    try {

        const decoded = verifytoken(token); 

        req.user = decoded ; 

        next() ; 

    }catch(err){

        res.clearCookie("token");

        res.status(401).json({message : "invalid or expired token"});

    }

};