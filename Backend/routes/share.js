const express = require("express");
const router = express.Router();
const fetchToken = require("../middleware/login");
const ShareNotes = require('../models/ShareNotes');
const User = require("../models/User");
const Notes = require("../models/Notes")
const mongoose = require("mongoose");
const sendEmail = require("./sendEmail")



//  --------------------------Get Users to share---------------------
router.get("/getusers/:id", fetchToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const users = await User.find({ _id: { $ne: req.user.id }, college: user.college })
        res.json(users)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }
})

// ------------------------- add shared notes--------------------------------
router.post("/addsharedNote", fetchToken, async (req, res) => {
    try {
        const { rId, nId } = req.body
        const availableNote = await ShareNotes.findOne({ senderId: req.user.id, receiverId: rId, noteId: nId })
        if (availableNote) {
            res.status(400).json(false)
        }
        else {
            const shareNote = new ShareNotes({ senderId: req.user.id, receiverId: rId, noteId: nId })
            await shareNote.save();
            res.json(true)
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }
})

// --------------------------fetchSharedNotes--------------------------------
router.get("/sharedNotes", fetchToken, async (req, res) => {
    try {
        const senderDocs = await ShareNotes.find({ receiverId: req.user.id }).populate("senderId","name").populate('noteId');
        res.json(senderDocs)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }
})

// --------------------------delete Shared notes--------------------------------
router.delete("/deletesharedNotes/:id", fetchToken, async (req, res) => {
    try {
        let note = await ShareNotes.findById(req.params.id);
        let NoteId = await ShareNotes.find({noteId:req.params.id});
        if (!note) {
            if(!NoteId){
                return res.status(404).send("not found");
            }
            await ShareNotes.deleteMany({noteId:req.params.id});
            res.json("Success")
        }
        else{
            note = await ShareNotes.findByIdAndDelete(req.params.id, { new: true })
            res.json("Success")
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }
})

// -------------------------- Share notes via email --------------------------------
router.post("/shareNoteEmail", fetchToken, async (req, res) => {
    try {
        const {nId,rId} = req.body
        const note =await Notes.findById(nId)
        const receiver = await User.findById(rId)
        const sender = await User.findById(req.user.id)
        const text = `From : ${sender.email}\nTo : ${receiver.email}\nSubject : ${note.title}\nReminder : ${note.description}`
        sendEmail(receiver.email,"Reminder!",text);
        res.json(true) 
    } catch (error) {
        console.error(error.message)
        res.status(500).json(false)
    }
})

module.exports = router