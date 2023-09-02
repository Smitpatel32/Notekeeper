import React from 'react'

const About = () => {
    return (
        <div>
            <h3>
                Welcome to NoteKeeper!
            </h3>
            <div className="border border-dark mt-4" >
                <div className="container p-4">
                    <p>
                    &nbsp; At NoteKeeper, we are committed to providing you with a seamless and efficient digital notebook experience. Our platform is designed to help you organize your thoughts, jot down ideas, and stay productive in the digital realm.
                    </p>
                    <p>
                    &nbsp;  With our user-friendly interface, you can create, edit and access your notes anytime, anywhere. Whether you're a student, professional, or someone who loves to stay organized, our digital notebook also offers a solution for college students to share notes among them. We try to fullfill all your note-taking needs with our digital notebook.
                    </p>
                    <p>
                    Thank you for choosing NoteKeeper as your digital notebook platform. Start organizing your thoughts and streamlining your productivity today!
                    </p>
                    <p>
                    Happy note-taking!
                    </p>
                    <div className="container d-flex justify-content-center">
                    <a href="https://www.instagram.com/_smit_15_02_/" target="_blank" rel="noreferrer"><i style={{color:"black",fontSize:"50px"}} className="bi bi-instagram m-2"></i>
                    </a>
                    <a href="https://github.com/Smitpatel32" target="_blank" rel="noreferrer"><i style={{color:"black",fontSize:"50px"}} className="bi bi-github m-2"></i></a>
                    <a href="https://www.linkedin.com/in/smit-patel-a9b958248/" target="_blank" rel="noreferrer"><i style={{color:"black",fontSize:"50px"}} className="bi bi-linkedin m-2"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;