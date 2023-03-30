import React from 'react'
import { Container } from 'react-bootstrap'
import classes from "./VarifyEmail.module.css"

export default function VarifyEmail() {
    const varifyEmail_handler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCTW5LuWc52S9DpPQ2hVQuk23_8jUrhY0A", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: localStorage.getItem("tokenId")
                })
            })
            const data = await res.json();
            console.log(data);
            if (!res.ok) {
                throw new Error(data.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className={`d-flex flex-column align-items-center justify-content-center ${classes.varifyEmailBox}`}>
            <h1 className='text-center'>Your Email is not Verified</h1>
            <button className='primaryBtn' onClick={varifyEmail_handler}>VERIFY YOUR EMAIL</button>
            <p className='fs-5 text-center'>Verify your Email for using all Features of Ultimate Expense Tracker</p>
        </Container>
    )
}
