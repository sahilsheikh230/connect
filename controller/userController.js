
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Meeting from "../models/meeting.js";
 export const registerUser=async (req, res) => {
    let data = req.body;

    try {
        const existingUsername = await User.findOne({ username: data.username });

        const existingphone = await User.findOne({ phone: data.phone });
        if (existingUsername || existingphone) {
            return res.status(400).json({ message: "User already exists" });


        }
        else {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            const newuser = new User(data);
            await newuser.save();
            res.status(201).json({ message: "User Registered Successfully!" });
        }
    }
    catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });

    }


}

 export const loginUser= async (req, res) => {
    try {
        const token = await jwt.sign({ id: req.user._id, username: req.user.username }, process.env.SECRET_KEY, { expiresIn: "15m" });
    
        res.status(200).json({
            message: "Login Successfully!",
            token,
            user: {
                id: req.user._id,
                username: req.user.username
            }
        });




    }
    catch (err) {
        res.status(400).json({ message: "Server error", error: err.message });
    }
}
 export const meet= async (req, res) => {
    const username=req.user.username;

    return res.status(200).json({ message: 'Welcome to Dashboard',username:username })
}
export const roomjoin=async(req,res)=>{

 let username= req.user.username;
 let userid=req.user.id;
 let roomId=req.params.id;
let newmeeting=new Meeting({user_id:userid,meetingCode:roomId})
await newmeeting.save();


    return res.status(200).json({message:"Welcome to Room",username:username});
}
export const history=async(req,res)=>{
     let userid=req.user.id;
    let data=await Meeting.find({user_id:userid})
if(data)
return res.status(200).json({data:data});
else{
    return res.status(400).json({message:"Not found any hsitory"})
}
    
}