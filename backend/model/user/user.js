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

    phone : {
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