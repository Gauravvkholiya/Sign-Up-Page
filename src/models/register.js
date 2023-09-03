const { Collection } = require("mongoose");

const mongoose = require("mongoose");

const employeeSchema  = new mongoose.Schema({
    name :{
        type:String ,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    }
})


// creating a Collection

const Register = new mongoose.model("Register",employeeSchema)   //first letter should be capital

module.exports = Register;