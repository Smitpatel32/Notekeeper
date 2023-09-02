const mongoose = require('mongoose')
const {Schema} = mongoose

const TokenSchema = new Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },
    token:{
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires:3600
    }
});

const Token = mongoose.model('token', TokenSchema);
module.exports = Token