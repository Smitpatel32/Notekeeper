import React,{ useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function UpdateNote(props) {
    const a = useContext(noteContext);
    const {editNote} = a;
    
    const handleClick = () =>{
        editNote(props.note.id,props.note.etitle,props.note.edescription,props.note.etag)
        props.showAlert("Updated Successfully","success")
    }
    const onchange = (e) =>{
        props.setnote({...props.note,[e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Values</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title :</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onchange} value={props.note.etitle} required  minLength={5} maxLength={30} placeholder="Min 5 letters"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description :</label>
                                    <input type="textbox" className="form-control" id="edescription" name="edescription" onChange={onchange} value={props.note.edescription}required  minLength={5} placeholder="Min 5 letters"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tags :</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={props.note.etag}/>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button"  data-bs-dismiss="modal" className="btn btn-primary" disabled={props.note.etitle.length<5 || props.note.edescription.length<5}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

