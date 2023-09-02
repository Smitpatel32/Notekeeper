import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Whatsapp from "../Image/whatsapp.png"
import Gmail from "../Image/Mail.png"

export default function Reminder(props) {
    const a = useContext(noteContext);
    const {addRemind} = a;
    let d = props.note.ereminder
    const [remindAt, setremindAt] = useState(d);
    const handleClick =(appName) =>{
        console.log(remindAt)
        if(remindAt==="" || remindAt===null)
        {
            props.showAlert(`Please Select Time and Date`,"warning")
        }
        else{
            addRemind(props.note.id,remindAt,appName)
            props.showAlert(`Reminder Set Successfully with ${appName}`,"success")
        }
    }
    return (
        <div className="modal fade" id="remindModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Set Reminder</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center align-item-center flex-column">
                        <div className="mb-2">
                            <label htmlFor="edate" className="form-label w-100 " >Set Date :</label>
                            <DatePicker
                                selected={remindAt}
                                onChange={(date) => 
                                    {setremindAt(date) 
                                }}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate= {new Date()}
                                id="edate"
                                className="form-control mb-3"
                                placeholderText =  "Enter Date and Time for Reminder"
                                style={{width:"100%"}}
                            />
                        </div>
                                <label htmlFor="etag" className="form-label w-100">Select a Way to Remind :</label>
                            <div className="mb-2">
                                <div className="btn btn-light my-2 w-100 border-dark" data-bs-dismiss="modal" onClick={()=>{handleClick("Whatsapp")}}>
                                <img style={{height:"1.5rem"}} src={Whatsapp} alt="whatsapp-Icon"/>
                                &nbsp; Send via Whatsapp
                                </div>
                                <button className="btn btn-light w-100 border-dark" data-bs-dismiss="modal" onClick={()=>{handleClick("Gmail")}}>
                                <img style={{height:"1.5rem"}} src={Gmail} alt="gmail-Icon" />
                                &nbsp; Send via G-mail
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
