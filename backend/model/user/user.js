import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },

    Email : {
        type : String,
        required : true,
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
        unique : true,
    },

    PRN : {
        type : String,
        unique : true,
    }
})

UserSchema.index({Email : 1})

export default mongoose.model("User" , UserSchema)