import React, { useContext, useRef, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import classes from "./AuthenticationForm.module.css"
import LoadingSpinner from "../UI/LoadingSpinner"
import Overlay from '../UI/Overlay'
import AuthContext from '../store/auth-context'

export default function AuthenticationForm() {
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const [signUp, setSignUp] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState({
        isTrue: false,
        message: ""
    });

    const authOption_handler = () => {
        setSignUp((prv) => {
            return !prv;
        })
    }

    const overlayClose_handler = () => {
        setSuccess({
            isTrue: false,
            message: ""
        });
    }

    const authCtx = useContext(AuthContext);

    const auth_handler = async (e) => {
        e.preventDefault();
        const userEmail = email.current.value;
        const userPassword = password.current.value;
        let userConfirmPassword;
        if (signUp) {
            userConfirmPassword = confirmPassword.current.value;
        }

        if (signUp && userPassword !== userConfirmPassword) {
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

        if (signUp) {
            setLoading(true);
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
                // let data = await res.json();
                if (!res.ok) {
                    throw new Error("something wrong")
                }
                setSuccess({
                    isTrue: true,
                    message: "Account Created Successfully !"
                });
                setSignUp(false);
            }
            catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        else {
            setLoading(true);
            try {
                let res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTW5LuWc52S9DpPQ2hVQuk23_8jUrhY0A", {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        password: userPassword,
                        returnSecureToken: true
                    })
                })
                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error.message)
                }
                localStorage.setItem("tokenId", data.idToken);
                localStorage.setItem("user_email", data.email);
                authCtx.loginStatus_handler(data.idToken);
            }
            catch (err) {
                const message = err.message;
                setSuccess({
                    isTrue: true,
                    message: message
                })
            }
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            {success.isTrue && <Overlay message={success.message} onClick={overlayClose_handler} />}
            <Col lg={4} className={`d-flex flex-column`}>
                <Col className={`p-4 bg-light shadow-lg ${classes.authForm}`}>
                    <h1 className={`text-center my-1`}>{(signUp) ? "Sign Up" : "Login"}</h1>
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

                        {signUp && <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={confirmPassword} />
                        </Form.Group>}

                        {!loading && <Button variant="primary" type="submit" className={`d-block m-auto py-2 px-4 ${classes.signUpBtn}`}>
                            {(signUp) ? "Sign Up" : "Login"}
                        </Button>}
                        {loading && <LoadingSpinner loaderSize="60px" />}
                    </Form>
                </Col>
                {!loading && <button className={`${classes.optionBtn} shadow-lg`} onClick={authOption_handler}>
                    {(signUp) ? "Have An Account? Login" : "Don't Have An Account? Sign Up"}
                </button>}
            </Col>
        </React.Fragment>
    )
}
