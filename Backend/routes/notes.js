require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sendEmail = require("./sendEmail");
const express = require("express");
const router = express.Router();
const fetchToken = require("../middleware/login");
const Notes = require('../models/Notes')
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


// ....................... fetch notes...............................
router.get("/fetchallnotes", fetchToken, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error.")
    }
})

// ....................... Add Notes...............................
router.post("/addnote", fetchToken, [
    body('title').trim().notEmpty().isByteLength({ min: 5, max: 30 }),
    body('description', "Description Must be atleast 5 character").trim().notEmpty().isByteLength({ min: 5 }),
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }
        else {
            const { title, description, tag } = req.body;
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error.")
    }
}
)

// ....................... update Note...............................
router.put("/updatenote/:id", fetchToken, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const newNote = {}
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }
})

// .......................Delete Note...............................
router.delete("/deletenote/:id", fetchToken, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id, { new: true })
        res.json("Success")
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }
})

// .......................  Add reminder ...............................
router.put("/addReminder/:id", fetchToken, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        let remindObj = {
            remindAt: req.body.remindAt,
            reminded: req.body.reminded,
            remind: req.body.remind,
            appName:req.body.appName
        }
        note = await Notes.findByIdAndUpdate(req.params.id, remindObj, { new: true })
        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "internal server error." })
    }   
})


// ....................... sending reminders ...............................
router.get("/reminders", fetchToken, async (req, res) => {
    try {
        const user = await User.find({ _id: req.user.id })
        setInterval(async () => {
            let notes = await Notes.find({ user: req.user.id, remind: true });
            if (notes !== null) {
                notes.forEach(async (note) => {
                    const now = new Date();
                    const remind = new Date(note.remindAt)
                    const nowUtc = Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())
                    const remindUtc = Date.UTC(remind.getFullYear(),remind.getMonth(),remind.getDate())

                    if ( remindUtc < nowUtc) {
                        let y = {reminded:true,remind:false}
                        await Notes.findByIdAndUpdate(note._id,y,{new:true})
                    }
                    else if(remindUtc > nowUtc){
                    }
                    else{
                        if (note.reminded === false){
                            if(remind.getHours() === now.getHours() && remind.getMinutes() === now.getMinutes())
                            {
// Sending reminder through whatsapp using twilio api
                                if(note.appName==="Whatsapp")
                                {
                                    client.messages.create({
                                        body: `Reminder!\n\nTitle : ${note.title},\nDescription : ${note.description}`,
                                        from: 'whatsapp:+14155238886',
                                        to: 'whatsapp:+91'+user[0].mobileNo
                                    })
                                    .then(message => console.log(message))
                                    .done;
                                    let y = {reminded:true,remind:false}
                                    await Notes.findByIdAndUpdate(note._id,y,{new:true})
                                }
                                else if(note.appName==="Gmail"){
// Sending reminder using email.
                                    const text = `Subject : ${note.title}\nReminder : ${note.description}`
                                    await sendEmail(user[0].email,"Self-Reminder!",text);
                                    let y = {reminded:true,remind:false}
                                    await Notes.findByIdAndUpdate(note._id,y,{new:true})
                                }
                                }
                            }
                        }
                })
            }
        }, 5000)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error.")
    }
})

module.exports = router