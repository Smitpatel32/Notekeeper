const mongoose = require('mongoose')
const {Schema} = mongoose

// User Schema
const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    college:{
        type:String,
        default:""
    },
    Date: {
        type:Date,
        default:Date.now()
    },
    verified:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User