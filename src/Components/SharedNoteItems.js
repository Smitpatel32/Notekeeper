import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function SharedNoteItems(props) {

    const { note} = props;
    const a = useContext(noteContext);
    const {deleteShareNote} = a
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
            <div className="card  border-dark d-flex flex-column " style={{ minHeight: "100%" }} >
                <div className="card-body p-0">
                    <div className="card-header d-flex flex-column justify-content-center" style={{ height: "7rem" }}>
                        <h5 className="card-title">{note.noteId.title}</h5>
                        <div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }}>
                                <i className="bi bi-clipboard-fill mx-2 text-primary" title="Copy Description" onClick={() => {
                                    navigator.clipboard.writeText(note.noteId.description)
                                    props.showAlert("Description Copied Successfully", "success")
                                }}></i>
                            </div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }}>
                                <i title="Delete" className="bi bi-trash-fill mx-2 text-danger" onClick={() => {
                                    deleteShareNote(note._id)
                                    props.showAlert("Deleted Successfully", "success")
                                }}></i>
                            </div>
                        </div>
                    </div>
                    <div className="text-wrap m-4">
                        <div className="card-text ">{note.noteId.description}</div>
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="text-secondary p-2" style={{ fontSize: "0.8rem" }}>{note.noteId.remindAt ? `${new Date(note.noteId.remindAt).toLocaleString()}  Remind using ${note.noteId.appName}` : "No reminder"} 
                    </div>
                    <div className="card-text ">{`Shared By ${note.senderId.name}`}</div>
                    <div className="card-footer text-muted" style={{ fontSize: "0.8rem" }}>{note.noteId.tag}</div>
                </div>
            </div>
        </div>
    )
}
