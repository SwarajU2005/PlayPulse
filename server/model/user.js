import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Name is required']
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const user = mongoose.model('user',userSchema);

export default user;