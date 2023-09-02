import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function NoteItems(props) {

    const { note, updateNote } = props;
    const a = useContext(noteContext);
    const { deleteNote,deleteShareNote } = a;

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 my-3 ">
            <div className="card  border-dark d-flex flex-column " style={{ minHeight: "100%" }} >
                <div className="card-body p-0">
                    <div className="card-header d-flex flex-column justify-content-center" style={{ height: "7rem" }}>
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }}>
                                <i className="bi bi-clipboard-fill mx-2 text-primary" title="Copy Description" onClick={() => {
                                    navigator.clipboard.writeText(note.description)
                                    props.showAlert("Description Copied Successfully", "success")
                                }}></i>
                            </div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }}>
                                <i title="Delete" className="bi bi-trash-fill mx-2 text-danger" onClick={() => {
                                    deleteNote(note._id)
                                    deleteShareNote(note._id)
                                    props.showAlert("Deleted Successfully", "success")
                                }}></i>
                            </div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }}>
                                <i title="Update" className="bi bi-pencil-square mx-2 text-success"
                                    data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => { updateNote(note) }}></i>
                            </div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }} data-bs-toggle="modal" data-bs-target="#remindModal">
                                <i title="Add Reminder" className={`bi bi-bell-fill mx-2 text-body-tertiary`}
                                    onClick={() => {
                                        updateNote(note)
                                    }}></i>
                            </div>
                            <div className="icon-link icon-link-hover" style={{ "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)", "cursor": "pointer" }} data-bs-toggle="modal" data-bs-target="#shareModal">
                                <i title="Share" className="bi bi-share-fill mx-2 text-black"
                                    onClick={() => {
                                        updateNote(note)
                                    }}>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="text-wrap m-4">
                        <div className="card-text ">{note.description}</div>
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="text-secondary p-2" style={{ fontSize: "0.8rem" }}>{note.remindAt ? `${new Date(note.remindAt).toLocaleString()}  Remind using ${note.appName}` : "No reminder"} </div>
                    <div className="card-footer text-muted" style={{ fontSize: "0.8rem" }}>{note.tag}</div>
                </div>
            </div>
        </div>
    )
}
