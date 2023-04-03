import React, { useRef, useState } from 'react'
import classes from "./ForgetPassword.module.css"
import { useHistory } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import LoadingSpinner from "../UI/LoadingSpinner"
import Overlay from '../UI/Overlay';
import { useSelector } from 'react-redux';

export default function ForgetPassword() {
    const email = useRef();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({
        isTrue: false,
        message: "Check Your Email For Password Reset Link"
    })

    const overlayClose_handler = () => {
        setOverlay({
            isTrue: false,
            message: ""
        })
        history.push("/");
    }

    const forgetPassword_handler = () => {
        history.push("/");
    }

    const api_key = useSelector(state => state.auth.api_key);

    const forgetRequest_handler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email.current.value
                })
            })
            const data = await res.json();
            // console.log(data);
            if (!res.ok) {
                throw new Error(data.error.message);
            }
            setOverlay({
                isTrue: true,
                message: "Check Your Email For Password Reset Link"
            })
            setLoading(false);
        }
        catch (err) {
            // console.log(err.message)
            // const message = err.message;
            setOverlay({
                isTrue: true,
                message: err.message
            })
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            {overlay.isTrue && <Overlay message={overlay.message} onClick={overlayClose_handler} />}
            <Col lg={4} className={`d-flex flex-column ${classes.cont}`}>
                <Col className={`p-4 bg-light shadow-lg ${classes.authForm}`}>
                    <h1 className={`text-center my-1`}>Reset Password</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={password} />
                        </Form.Group> */}

                        {/* {signUp && <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={confirmPassword} />
                        </Form.Group>} */}
                        <button className={`${classes.cancel_forgetBtn}`} onClick={forgetPassword_handler}>Cancel Password Reset</button>

                        {!loading && <Button onClick={forgetRequest_handler} variant="primary" type="submit" className={`d-block m-auto py-2 px-4 ${classes.forgetBtn}`}>
                            Send Email Verification
                        </Button>}
                        {loading && <LoadingSpinner loaderSize="60px" />}
                    </Form>
                </Col>
                {!loading && <button className={`${classes.optionBtn} shadow-lg`} onClick={forgetPassword_handler}>
                    Have An Account? Login
                </button>}
            </Col>
        </React.Fragment>
    )
}
