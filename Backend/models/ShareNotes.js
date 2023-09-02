const mongoose = require('mongoose')
const {Schema} = mongoose

// ShareNotes Schema
const ShareNoteSchema = new Schema({
    senderId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    noteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"note"
    }
});

module.exports = mongoose.model('sharenote',ShareNoteSchema)