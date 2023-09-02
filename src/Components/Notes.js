import React, { useContext, useEffect,useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItems from './NoteItems';
import SharedNoteItems from './SharedNoteItems';
import AddNote from './AddNote'
import { useNavigate } from "react-router-dom";
import UpdateNote from "./UpdateNote"
import Reminder from "./Reminder"
import Share from "./Share"

export default function Notes(props) {
    const a = useContext(noteContext);
    const { notes, sharednotes, fetchAllNotes,fetchAllSharedNotes,reminderNote} = a;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")==null){
            navigate("/login") 
        }
        else{
            fetchAllNotes();
            fetchAllSharedNotes();
            reminderNote();
        }
        // eslint-disable-next-line
    }, [])
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:"",ereminder:""})

    const updateNote =  (currentNote) => {
        setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag,ereminder:currentNote.remindAt})
    }   
    return (
        <div className="container">
            <AddNote showAlert={props.showAlert}/>
            <UpdateNote showAlert={props.showAlert} note={note} setnote={setnote}/>
            <Reminder showAlert={props.showAlert} note={note}/>
            <Share showAlert={props.showAlert} note={note} />
            <div className="row text-center">
                <div className="text-center">
                    {notes.length === 0 ?"No Notes to Display": <h3>NOTES</h3>}
                    </div> 
                {notes.map((note) => {
                    return <NoteItems showAlert={props.showAlert} key={note._id} note={note} updateNote={updateNote}/>
                })}
            </div>
            <div className="row text-center mt-4 ">
                <div className="text-center">
                    {sharednotes.length === 0 ?"No Shared Notes to Display": <h3>SHARED NOTES</h3>}
                    </div> 
                {sharednotes.map((note) => {
                    return <SharedNoteItems showAlert={props.showAlert} key={note._id} note={note} updateNote={updateNote}/>
                })}
            </div>
        </div>
    )
}
