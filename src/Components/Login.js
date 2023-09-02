import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    const navigate = useNavigate();
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email:credentials.email, password: credentials.password})
            });
          const json = await response.json()
          if(json.success){
              if(json.message!=="")
              {
                  props.showAlert(json.message,"success")
                }
                else{
                    navigate("/home")
                    localStorage.setItem('token',json.authToken);
                    props.showAlert("Logged In","success")
                }
            }
            else{
                props.showAlert(json.errors,"danger")
            }
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container pt-3">
            <h2>Login to FlickBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailAdd" className="form-label mt-2">Email</label>
                    <input type="email" className="form-control" id="emailAdd"  name="email" aria-describedby="emailHelp" onChange={onchange} placeholder="Enter Valid Email" value={credentials.email} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pswd" className="form-label">Password :</label>
                    <input type="password" className="form-control" id="pswd" placeholder="Enter Valid Password" name="password" autoComplete="true" onChange={onchange} value={credentials.password}  required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
