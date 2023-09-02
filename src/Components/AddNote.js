import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function AddNote(props) {
    const a = useContext(noteContext);
    const { addNote } = a;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setnote({title: "",description: "",tag: ""})
        props.showAlert("Added Successfully","success")
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2>Add Note :</h2>
            <div className="container p-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title :</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onchange} required minLength={5} maxLength={30} title="" placeholder="Min 5 letters" value={note.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description :</label>
                        <input type="textbox" className="form-control" id="description" name="description" onChange={onchange} required minLength={5} placeholder="Min 5 letters" value={note.description}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tags :</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}  value={note.tag}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.title.length < 5 || note.description.length < 5}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
