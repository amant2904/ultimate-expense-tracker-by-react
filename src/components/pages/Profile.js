import React, { useRef, useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classes from "./Profile.module.css"
// import AuthContext from '../store/auth-context'
import LoadingSpinner from '../UI/LoadingSpinner'
import Overlay from '../UI/Overlay'
import { useSelector } from 'react-redux'

export default function Profile(props) {
    const editing = props.editing;

    const [startEditing, setStartEditing] = useState(false);

    const startEditing_handler = (e) => {
        e.preventDefault();
        setStartEditing(true);
    }

    const [loading, setLoading] = useState(false);
    const [overLay, setOverLay] = useState({
        istrue: false,
        message: ""
    });

    const overlayClose_handler = () => {
        setOverLay({
            istrue: false,
            message: ""
        })
    }

    const fullName = useRef();
    const photoUrl = useRef();

    const cancelEditing_handler = () => {
        props.editProfile();
        setStartEditing(false);
    }

    const api_key = useSelector(state => state.auth.api_key)

    const profileUpdate_handler = async (e) => {
        setLoading(true);
        e.preventDefault();
        let obj = {
            idToken: localStorage.getItem("tokenId"),
            displayName: fullName.current.value,
            photoUrl: photoUrl.current.value,
            deleteAttribute: [],
            returnSecureToken: true
        }
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(obj)
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error.message)
            }
            setOverLay({
                istrue: true,
                message: "Profile Updated Successfully"
            })
            props.editProfile();
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    // const authCtx = useContext(AuthContext);
    const userName = useSelector(state => state.auth.fullName);
    const userProfile = useSelector(state => state.auth.photoUrl);


    const editHandler = () => {
        props.editProfile();
    }

    return (
        <React.Fragment>
            {overLay.istrue && <Overlay message={overLay.message} onClick={overlayClose_handler} />}
            <Container className={`my-3`}>
                <h1 className={`text-center`}>{(editing) ? "Update Profile" : "Profile Details"}</h1>

                {/* edit profile form */}
                {editing && <Row className={`w-75 mx-auto my-3 justify-content-end`}>
                    {!startEditing && <Button className={`w-auto ${classes.startEditingBtn}`} variant='danger' onClick={startEditing_handler}>Edit Profile</Button>}
                    <Button className='w-auto mx-3' variant='danger' onClick={cancelEditing_handler}>Cancel Updating</Button>
                </Row>}

                {editing && <Row className={`w-75 mx-auto my-3`}>
                    <Form className='mt-4'>
                        <Form.Group as={Row} className={`mb-3 ${classes.editFormInput}`} controlId="fullname">
                            <Form.Label column sm={3}>
                                Full Name :
                            </Form.Label>
                            <Col sm={9}>
                                {(userName && !startEditing) ?
                                    <Form.Control type="text" placeholder="Enter Name" value={userName} ref={fullName} disabled /> :
                                    <Form.Control type="text" placeholder="Enter Name" ref={fullName} />
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className={`mb-3 ${classes.editFormInput}`} controlId="profilephoto">
                            <Form.Label column sm={3}>
                                Profile Photo URL :
                            </Form.Label>
                            <Col sm={9}>
                                {(userProfile && !startEditing) ?
                                    <Form.Control type="url" placeholder="Enter URL" value={userProfile} ref={photoUrl} disabled /> :
                                    <Form.Control type="url" placeholder="Enter URL" ref={photoUrl} />
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className={`mb-3 ${classes.editFormInput}`} controlId="useremail">
                            <Form.Label column sm={3}>
                                Email :
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" placeholder="Email" value={localStorage.getItem("user_email")} disabled />
                            </Col>
                        </Form.Group>

                        {!loading && <Button className={`${classes.editProfileBtn} px-5 py-2 rounded-4`} onClick={profileUpdate_handler}>{(startEditing) ? "Edit" : "Update"}</Button>}
                        {loading && <LoadingSpinner loaderSize="70px" />}
                    </Form>
                </Row>}

                {/* profile page content */}
                {!editing && <Row className={`w-75 mx-auto my-3 justify-content-between`}>
                    <Link to="/" className={`w-auto btn fs-4 px-4 py-2 ${classes.goToHomeBtn}`} variant='danger'>Go Back to Home</Link>
                    <Button className={`w-auto ${classes.editBtn}`} onClick={editHandler}>Edit Profile</Button>
                </Row>}
                {!editing && <Row className={`mt-4`}>
                    <Col className={`d-flex align-items-center justify-content-center`} sm={5}>
                        <div className={`${classes.userProfilePic}`}>
                            <img src={userProfile} alt="profile" height={"100%"} width={"100%"} />
                        </div>
                    </Col>
                    <Col className={`${classes.userDetails}`}>
                        <Row>
                            <Col sm={4}>
                                <p>Full Name :- </p>
                            </Col>
                            <Col>
                                <p className={`text-left`}>{userName}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <p>Email Address :- </p>
                            </Col>
                            <Col>
                                <p className={`text-left`}>{localStorage.getItem("user_email")}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>}
            </Container>
        </React.Fragment>
    )
}
