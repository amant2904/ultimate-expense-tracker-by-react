import React from 'react'
import classes from "./PremiumBtn.module.css"
import { Col, Container, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { authActions } from '../../redux-store/authSlice'

export default function PremiumBtn(props) {
    const dispatch = useDispatch();
    const getPremium_handler = () => {
        dispatch(authActions.premium());
        props.cancel();
    }

    return (
        <Col lg={8}>
            <Container className={`border border-2 border-dark p-3 mt-4 rounded-3`}>
                <h2 className={`fs-4 text-center my-2`}>Get Ultimate Expense Tracker Premium for more than 10,000 Rupees Expenses</h2>
                <h2 className={`fs-4 text-center my-2`}>and for using Some Advance Features</h2>
                <Button className={`d-block m-auto my-3 ${classes.premiumBtn}`} onClick={getPremium_handler}>Get Premium</Button>
                <button className={`d-block m-auto ${classes.cancelPremium}`} onClick={props.cancel}>Cancel</button>
            </Container>
        </Col>
    )
}
