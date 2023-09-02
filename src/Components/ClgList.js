import React from 'react'

export default function ClgList(props) {
    const {user,note,showAlert,gmail} = props
    const HandleClick = async (userId) =>{
        if(gmail===false)
        {
            const response = await fetch(`http://localhost:5000/api/share/addsharedNote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("token")
                },
                body:JSON.stringify({rId:userId,nId:note.id})
            });
            const sN = await response.json()
            if(sN){
                showAlert(`Shared to ${user.name}`,"success")
            }
            else{
                showAlert(`Note is Already Shared`,"danger")
            }
        }
        else{
            const response = await fetch(`http://localhost:5000/api/share/shareNoteEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("token")
                },
                body:JSON.stringify({rId:userId,nId:note.id})
            });
            const sN = await response.json()
            console.log(sN)
            if(sN){
                showAlert(`Shared to ${user.name}`,"success")
            }
            else{
                showAlert(`Sorry some internal error occurred.`,"danger")
            }
        }
    }
    return (
        <div className="m-1">
            <button data-bs-dismiss="modal" onClick={()=>{HandleClick(user._id)}} key={user._id} className="list-group-item d-flex justify-content-between align-items-start btn ms-2 me-auto border-dark mx-2 btn-light w-100">
                <div className="fw-bold">{user.name}</div>
                {user.email}
            </button>
        </div>
    )
}
