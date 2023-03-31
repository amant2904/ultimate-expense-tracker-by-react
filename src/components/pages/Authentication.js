import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AuthenticationForm from '../auth/AuthenticationForm'
import classes from "./Authentication.module.css"
import ForgetPassword from '../auth/ForgetPassword'
import { Route, Switch } from 'react-router-dom'

export default function Authentication() {
    return (
        <Container fluid className={`${classes.authScreen}`}>
            <Row className={`p-4 justify-content-left w-100`}>
                <Col className={`${classes.loginContent}`} lg={7}>
                    <h1>ULTIMATE</h1>
                    <h2>EXPENSE TRACKER</h2>
                    <h3>Keep Track of Each Penny Expense, You do</h3>
                    <div className={`${classes.loginHeadline}`}>
                        <p>More Than 3.5 Million Users across the World</p>
                    </div>
                </Col>
                <Switch>
                    <Route exact path="/">
                        <AuthenticationForm />
                    </Route>
                    <Route path="/forget-password">
                        <ForgetPassword />
                    </Route>
                </Switch>
            </Row>
        </Container>
    )
}
