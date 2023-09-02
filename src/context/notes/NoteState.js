import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)
  const [sharednotes, setsharednotes] = useState(notesInitial)
  const [login, setlogin] = useState(false)

  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    setnotes(json)
  }

  // Fetch shared Notes
  const fetchAllSharedNotes = async () => {
    const response = await fetch(`${host}/api/share/sharedNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    setsharednotes(json)
  }

  // Add a note.
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    setnotes(notes.concat(json))
  }

  // Delete a note.
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
    });
    const newNotes = notes.filter((e) => { return (e._id !== id) })
    setnotes(newNotes)
    //or fetchAllNotes();
  }
// Delete SHared Note
  const deleteShareNote = async (id) => {
    await fetch(`${host}/api/share/deletesharedNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
    });
    const newNotes = sharednotes.filter((e) => { return (e._id !== id) })
    setsharednotes(newNotes)
  }

  // Edit a note.
  const editNote = async (id, title, description, tag) => {

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // fetchAllNotes()
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
    }
    setnotes(newNotes)

  }
  // add Reminder
  const addRemind = async (id, remindAt, appName) => {
    let remind = true;
    let reminded = false;
    await fetch(`${host}/api/notes/addReminder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
      body: JSON.stringify({ remindAt: remindAt, remind: remind, reminded: reminded, appName: appName }),
    });
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].remindAt = remindAt;
      }
    }
    setnotes(newNotes)
  }

  // reminder
  const reminderNote = async () => {
    await fetch(`${host}/api/notes/reminders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token")
      },
    });
  }



  return (
    <NoteContext.Provider value={{ notes,setnotes, fetchAllNotes, addNote, deleteNote, editNote, login, setlogin, addRemind, reminderNote, sharednotes, fetchAllSharedNotes,deleteShareNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;