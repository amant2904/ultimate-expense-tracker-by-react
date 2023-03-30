import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import classes from "./Welcome.module.css"
import WelcomeHeader from '../layouts/WelcomeHeader'
import Profile from './Profile'
import { Switch, Route } from 'react-router-dom'

export default function Welcome() {
    const [editing, setEditing] = useState(false);
    const editProfile_handler = () => {
        setEditing((prv) => !prv);
    }

    return (
        <Container className={`${classes.welcome}`} fluid>
            <WelcomeHeader editProfile={editProfile_handler} editing={editing} />
            <Switch>
                <Route path="/profile">
                    <Profile editing={editing} editProfile={editProfile_handler} />
                </Route>
            </Switch>
        </Container>
    )
}
