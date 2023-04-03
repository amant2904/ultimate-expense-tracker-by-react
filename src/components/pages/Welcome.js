import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import classes from "./Welcome.module.css"
import WelcomeHeader from '../layouts/WelcomeHeader'
import Profile from './Profile'
import { Switch, Route } from 'react-router-dom'
import VarifyEmail from '../layouts/VarifyEmail'
// import AuthContext from '../store/auth-context'
import ExpenseRecord from './ExpenseRecord'
import { useSelector } from 'react-redux'

export default function Welcome() {
    const [editing, setEditing] = useState(false);
    const editProfile_handler = () => {
        setEditing((prv) => !prv);
    }

    const emailVerified = useSelector(state => state.auth.verified);
    const themeMode = useSelector(state => state.theme.mode);

    return (
        <Container className={`${(themeMode) ? classes.welcome : classes.welcomeDark}`} fluid>
            <WelcomeHeader editProfile={editProfile_handler} editing={editing} />
            <Switch>
                {!emailVerified && <Route exact path="/">
                    <VarifyEmail />
                </Route>}
                {emailVerified && <Route exact path="/">
                    <ExpenseRecord />
                </Route>}
                <Route path="/profile">
                    <Profile editing={editing} editProfile={editProfile_handler} />
                </Route>
            </Switch>
        </Container>
    )
}
