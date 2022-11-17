/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"


const LandingPage = (props) => {
    const setIsLoggedIn = props.setIsLoggedIn

    const navigate = useNavigate()

    const [input, setInput] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        if (input !== "") {
            if (input === props.username) {
                setIsLoggedIn(true)
                navigate("/dashboard")
            }
            else {
                alert("Incorrect Username")
            }
        }
        else {
            alert("UserName cannot be left blank")
        }

    }

    return (
        <div className='outerDiv'>
            <form onSubmit={(e) => handleSubmit(e)} className='innerDiv'>
                <h1>Landing Page</h1>
                <br />
                <marquee>Default UserName is "Anon@123"</marquee>
                <br />
                <input type={'text'} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter UserName"></input>
                <br />
                <button type='submit'>Login</button>
            </form>
        </div >
    )
}

export default LandingPage
