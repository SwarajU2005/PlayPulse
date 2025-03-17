import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
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

const Aowner = mongoose.model('Aowner',ownerSchema);

export default Aowner;