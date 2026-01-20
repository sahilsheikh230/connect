import mongoose from "mongoose";
const meetingSchema=new mongoose.Schema({
    user_id:{
        type:String,
    },
    meetingCode:{
        type:String,
        require:true,
    },
    Date:{
        type:String,
        default:Date.now()
    }
})
const Meeting=mongoose.model("Meeting",meetingSchema);
export default Meeting;