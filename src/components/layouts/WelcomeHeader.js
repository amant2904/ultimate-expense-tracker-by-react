import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import classes from "./WelcomeHeader.module.css"
// import AuthContext from '../store/auth-context'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux-store/authSlice'

export default function WelcomeHeader(props) {
    const updatingProfile = props.editing;

    const updatingHandler = () => {
        props.editProfile();
    }

    // const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const isPremium = useSelector(state => state.auth.premium);
    const logout_handler = () => {
        localStorage.removeItem("tokenId");
        localStorage.removeItem("user_email");
        // authCtx.loginStatus_handler()
        dispatch(authActions.logout_handler())
        history.replace("/");
    }

    const profile = useSelector(state => state.auth.photoUrl);
    const fullName = useSelector(state => state.auth.fullName);
    const themeMode = useSelector(state => state.theme.mode);

    return (
        <Container fluid className={`m-0 p-0 fixed ${(themeMode) ? classes.header : classes.headerDark}`}>
            <Row>
                <Col>
                    <div className={`${classes.logo}`}>
                        <h1 className={`${(themeMode) ? "" : "text-light"}`}>ULTIMATE</h1>
                        <h2 className={`m-0 ${(themeMode) ? "" : "text-light"}`}>EXPENSE TRACKER</h2>
                        {isPremium && <p className={`${classes.premiumTag}`}>Premium</p>}
                    </div>
                </Col>
                <Col className={`p-0 d-flex flex-column align-items-end`}>
                    <div className={`${classes.profileFunction} shadow-sm`}>
                        <div className={`${classes.profileBtn}`}>
                            <Link to="/profile">Your Profile</Link>
                        </div>
                        <div className={`${classes.logoutBtn}`}>
                            <button onClick={logout_handler}>Logout</button>
                        </div>
                    </div>
                    <div className={`${classes.incompleteProfileBtn}`}>
                        {(profile && fullName) && <p>Congratulations, Your Profile is 100% Completed</p>}

                        {((!profile || !fullName) && !updatingProfile) && <p>Your Profile is Incomplete. &nbsp;
                            <Link onClick={updatingHandler} to="/profile" >
                                Complete Now
                            </Link>
                        </p>}
                        {((!profile || !fullName) && updatingProfile) && <p>Your Profile is 66% Completed. A Complete Profile always creates Good Impact</p>}
                    </div>
                </Col>
            </Row>
        </Container >
    )
}
