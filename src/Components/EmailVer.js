import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import welcome from "../Image/Welcomep.png"

export default function EmailVer(props) {
const navigate = useNavigate()
let {showAlert} = props 

useEffect(() => {
    const VerifyEmail = async () => {
        setTimeout(()=>{
            navigate("/login")
            showAlert("Signed In","success")
        },3000)
    }
    VerifyEmail()
}, [navigate,showAlert])
    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="m-auto">
                <img style={{width:"900px"}} src={welcome} alt="Cats"/>
            </div>
            <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary spinner-border-md mx-4" role="status">
                 <span className="visually-hidden"></span>
             </div>
                <div className="fs-4 fw-bold">Redirecting To Login Page</div>
            </div>
        </div>
    )
}
