import React, { useState } from 'react'

export default function SignUp(props) {
   
    const [newUser, setnewUser] = useState({ name: "", email: "", password: "", cpassword: "",mobile:"",college:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUser.password === newUser.cpassword) {
            const response = await fetch(`http://localhost:5000/api/auth/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: newUser.name, email: newUser.email, password: newUser.password,mobile:newUser.mobile,college:newUser.college})
            });
            const json = await response.json()
            if(json.success)
            {
                props.showAlert(json.message,"success")
            }
            else{
                props.showAlert(json.errors,"danger")
            }
        }
        else{
            props.showAlert("Confirm Password should be same","danger")
        }
    }
    const onchange = (e) => {
        setnewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    return (
        <div className="container pt-3">
            <h2>Create An Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="addName" className="form-label">Name :</label>
                    <input type="text" className="form-control" id="addName" name="name" onChange={onchange} placeholder="Enter Name" value={newUser.name} required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="emailAdd" className="form-label">Email :</label>
                    <input type="email" className="form-control" id="emailAdd" name="email" aria-describedby="emailHelp" onChange={onchange} placeholder="Enter Valid Email" value={newUser.email} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="pswd" className="form-label">Password :</label>
                    <input type="password" className="form-control" id="pswd" placeholder="Enter Valid Password" name="password" onChange={onchange} value={newUser.password} required minLength={5}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="cpswd" className="form-label">Confirm Password :</label>
                    <input type="password" className="form-control" id="cpswd" placeholder="Enter Same Password" name="cpassword" onChange={onchange} value={newUser.cpassword} required minLength={5}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="mobile" className="form-label">Phone No.:</label>
                    <input type="tel" className="form-control" id="mobile" placeholder="Enter Valid Phone Number" name="mobile" onChange={onchange} value={newUser.mobile} required maxLength={10}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="college" className="form-label">College :</label>
                    <input type="text" className="form-control" id="college" name="college" onChange={onchange} placeholder="Enter College Name" value={newUser.college} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
