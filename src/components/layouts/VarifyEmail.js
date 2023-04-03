import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import classes from "./VarifyEmail.module.css"
import LoadingSpinner from '../UI/LoadingSpinner';
import Overlay from '../UI/Overlay';
// import AuthContext from '../store/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux-store/authSlice';

export default function VarifyEmail() {

    // const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({
        isTrue: false,
        message: ""
    })

    const overlayClose_handler = (e) => {
        e.preventDefault();
        setOverlay({
            isTrue: false,
            message: ""
        })
    }

    const api_key = useSelector(state => state.auth.api_key)

    const verifyEmail_handler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_key}`, {
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
            if (!res.ok) {
                throw new Error(data.error.message);
            }
            setVerify(true);
        }
        catch (err) {
            const message = err.message;
            setOverlay({
                isTrue: true,
                message: message
            })
        }
        setLoading(false);
    }

    const checkVerification_handler = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    idToken: localStorage.getItem("tokenId")
                })
            })
            const data = await res.json();
            // console.log(data);
            if (!res.ok) {
                throw new Error(data);
            }
            if (data.users[0].emailVerified === true) {
                // authCtx.verificationHandler(true)
                dispatch(authActions.verification(true))
            }
            else {
                setVerify(false);
            }

        }
        catch (err) {
            if (err.message) {
                setOverlay({
                    isTrue: true,
                    message: err.message
                })
            }
        }
        setLoading(false);
    }, [dispatch, api_key])

    useEffect(() => {
        checkVerification_handler();
    }, [checkVerification_handler, api_key])

    return (
        <React.Fragment>
            {overlay.isTrue && <Overlay message={overlay.message} onClick={overlayClose_handler} />}
            <Container className={`d-flex flex-column align-items-center justify-content-center ${classes.varifyEmailBox}`}>
                {!verify && <h1 className='text-center'>Your Email is not Verified</h1>}
                {verify && <h1 className='text-center'>Check Your Mail Account for Verification Link</h1>}
                {!verify && !loading && <button className='primaryBtn' onClick={verifyEmail_handler}>VERIFY YOUR EMAIL</button>}
                {verify && !loading && <button className='primaryBtn' onClick={checkVerification_handler}>CLICK HERE WHEN DONE</button>}
                {loading && <LoadingSpinner loaderSize="60px" />}
                {!verify && <p className='fs-5 text-center'>Verify your Email for using all Features of Ultimate Expense Tracker</p>}
            </Container>
        </React.Fragment>
    )
}
