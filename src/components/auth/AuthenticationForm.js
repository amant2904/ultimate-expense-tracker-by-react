import React, { useRef } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import classes from "./AuthenticationForm.module.css"

export default function AuthenticationForm() {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const auth_handler = async (e) => {
        e.preventDefault();
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        const userConfirmPassword = confirmPassword.current.value;

        if (userPassword !== userConfirmPassword) {
            alert("Password and Confirm password didn't match");
            return;
        }

        if (userEmail.includes("@") === false) {
            alert("invalid email address");
            return;
        }

        if (userPassword.trim().length < 7) {
            alert("password must be at least 7 characters long");
            return;
        }

        try {
            let res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTW5LuWc52S9DpPQ2hVQuk23_8jUrhY0A", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                    returnSecureToken: true
                })
            });
            let data = await res.json();
            if (!res.ok) {
                throw new Error("something wrong")
            }
            alert("sign up successfull with email :- \n" + data.email);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Col lg={4} className={`d-flex flex-column`}>
            <Col className={`p-4 bg-light shadow-lg ${classes.authForm}`}>
                <h1 className={`text-center my-1`}>Sign Up</h1>
                <Form onSubmit={auth_handler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={password} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={confirmPassword} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className={`d-block m-auto py-2 px-4 ${classes.signUpBtn}`}>
                        Sign Up
                    </Button>
                </Form>
            </Col>
            <button className={`${classes.loginBtn} shadow-lg`}>
                Have An Account ? Login
            </button>
        </Col>
    )
}