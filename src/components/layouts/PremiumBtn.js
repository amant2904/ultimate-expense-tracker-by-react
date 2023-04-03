import React from 'react'
import classes from "./PremiumBtn.module.css"
import { Col, Container, Button } from 'react-bootstrap'
export default function PremiumBtn(props) {
    return (
        <Col lg={8}>
            <Container className={`border border-2 border-dark p-3 mt-4 rounded-3`}>
                <h2 className={`fs-4 text-center my-2`}>Get Ultimate Expense Tracker Premium for more than 10,000 Rupees Expenses</h2>
                <Button className={`d-block m-auto my-3 ${classes.premiumBtn}`}>Get Premium</Button>
                <button className={`d-block m-auto ${classes.cancelPremium}`} onClick={props.cancel}>Cancel</button>
            </Container>
        </Col>
    )
}
