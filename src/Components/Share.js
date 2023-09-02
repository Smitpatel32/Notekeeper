import React,{useState} from 'react'
import College from "../Image/college.png"
import ShareList from './ShareList'
import Gmail from "../Image/Mail.png"

export default function Share(props) {
    const [users,setusers] = useState([])
    const [gmail,setGmail] = useState(false)
    const handleClick = async (e) =>{
        try{
            const response = await fetch(`http://localhost:5000/api/share/getusers/${props.note.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("token")
                },
            });
            const user = await response.json()
            setusers(user)
            if(e.target.id==="G_mail"){
                setGmail(true)
            }
            else{
                setGmail(false)   
            }
        }catch(error)
        {
            console.log(error)
            props.showAlert(error,"danger")
        }
    }

    return (
        <div>
            <ShareList users={users} note={props.note} gmail={gmail} showAlert={props.showAlert}/>
            <div className="modal fade" id="shareModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Select a way to Share Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center flex-column">
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <p>Send to College Partners</p>
                            <img id="college" className="mb-3" style={{width:"2rem",cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#sharelistModal" onClick={handleClick} src={College} alt="College-Icon"/>
                        </div>
                        <div className="d-flex justify-content-center flex-column align-items-center">
                            <p>Send via Email</p>
                            <img id="G_mail" style={{width:"2rem",cursor:"pointer"}} data-bs-toggle="modal" data-bs-target="#sharelistModal" onClick={handleClick} src={Gmail} alt="gmail-Icon" /> 
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
