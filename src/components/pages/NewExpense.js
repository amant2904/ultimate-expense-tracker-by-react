import React, { useRef, useState } from 'react'
// import classes from "./NewExpense.module.css"
import { Button, Col, Form, Row } from 'react-bootstrap'
import LoadingSpinner from "../UI/LoadingSpinner"
import { useSelector } from 'react-redux';
import PremiumBtn from '../layouts/PremiumBtn';

export default function NewExpense(props) {
    const [premiumBtn, setPremiumBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const amount = useRef();
    const expenseDate = useRef();
    const category = useRef();
    const descr = useRef();

    const database_api = useSelector(state => state.expenses.database_api);

    const cancel_premium = () => {
        setPremiumBtn(false);
    }

    const addExpense_handler = async (e) => {
        e.preventDefault();
        if (parseInt(amount.current.value) > 10000) {
            setPremiumBtn(true);
            return;
        }

        const expense_details = {
            amount: amount.current.value,
            date: expenseDate.current.value,
            category: category.current.value,
            descr: descr.current.value
        }
        const userEmail = localStorage.getItem("user_email");
        let filtered_email = "";

        for (let i in userEmail) {
            if (userEmail[i] !== "." && userEmail[i] !== "@") {
                filtered_email += userEmail[i]
            }
        }

        setLoading(true);
        try {
            const res = await fetch(`${database_api}/${filtered_email}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(expense_details)
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            props.addExpense({
                ...expense_details,
                id: data.name
            });
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            console.log(err.message);
        }
    }

    return (
        <React.Fragment>
            {!premiumBtn && <Col lg={8}>
                <Button variant='danger' onClick={props.cancelAdding} className={`my-4 px-4 py-2`}>Cancel Adding Expense</Button>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" placeholder="Enter Amount" ref={amount} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="Date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="Date" ref={expenseDate} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Default select example" ref={category}>
                                    <option value="travel">Travel</option>
                                    <option value="food" >Food</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="study">Study</option>
                                    <option value="health">Health</option>
                                    <option value="fashion">Fashion</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter Description' ref={descr} />
                        <Form.Text className="text-muted">
                            Description should not be more than 20 Words.
                        </Form.Text>
                    </Form.Group>
                </Form>
                {!loading && <Button className={`primaryBtn px-5 py-2 mt-3 d-block m-auto fs-3`} onClick={addExpense_handler}>Add Expense</Button>}
                {loading && <LoadingSpinner loaderSize="60px" />}
            </Col>}
            {premiumBtn && <PremiumBtn cancel={cancel_premium} />}
        </React.Fragment>
    )
}
