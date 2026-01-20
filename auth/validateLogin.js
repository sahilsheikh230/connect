


import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


   export const validateLogin=async(req,res,next)=>{
    
   let data=req.body;

try{
const user=await User.findOne({username:data.username});
if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
   const match=  await bcrypt.compare(data.password,user.password)

   if(!match){
    return res.status(400).json({ message: 'Invalid credentials' });
   }
   req.user=user;
   next();

}

 
 
catch(err){
   return  res.status(400).json({message:"server error"})
}
}

 export const verifyUser=async(req,res,next)=>{
   const authtoken=req.headers.authorization;

   if(!authtoken){
      return res.status(401).json({ message: "Log in first" });
   }
try {
const token=authtoken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Log in First!" });
  }

}
