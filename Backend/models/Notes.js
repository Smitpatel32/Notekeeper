const mongoose = require('mongoose')
const {Schema} = mongoose

// Notes Schema
const NotesSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tag: {
        type:String,
        defualt:"General"
    },
    Date: {
        type:Date,
        default:Date.now
    },
    remindAt:{
        type:Date,
        default:null
    },
    reminded:{
        type:Boolean,
        default:true
    },
    remind:{
        type:Boolean,
        default:false
    },
    appName:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model('note',NotesSchema)