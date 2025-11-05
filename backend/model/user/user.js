import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },

    Email : {
        type : String,
        required : true,
        unique : true,
        index : true
    },

    Password : {
        type : String,
        required : true
    },

    Phone : {
        type : String,
        required : true
    },

    RollNo : {
        type : String,
        required : true,
        unique : true,
        index : true
    },

    PRN : {
        type : String,
        required : true,
        unique : true,
        index : true
    }
})

export default mongoose.model("User" , UserSchema)