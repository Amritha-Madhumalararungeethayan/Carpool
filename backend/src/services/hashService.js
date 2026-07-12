const bcrypt = require("bcryptjs")

exports.hashPassword = async(plainpassword)=>{
return await bcrypt.hash(plainpassword,10);
}

exports.comparepassword = async(plainpassword, hashedpassword)=>{
    return await bcrypt.compare(plainpassword,hashedpassword);
}