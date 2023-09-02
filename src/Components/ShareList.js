import React from 'react'
import ClgList from "./ClgList"
export default function ShareList(props) {
    const {users,note,gmail} = props
    return (
        <div>
            <div className="modal fade" id="sharelistModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">List Of College Colleagues</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                            {users.length === 0 ?"No one To share":"Share with :"}
                               { users.map((user)=>{
                                 return <ClgList note={note} key={user._id} gmail={gmail} user={user} showAlert={props.showAlert}/>
                               }) }
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#shareModal" >Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
