import React, { useRef } from 'react'
// import classes from "./NewExpense.module.css"
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function NewExpense(props) {
    const amount = useRef();
    const expenseDate = useRef();
    const category = useRef();
    const descr = useRef();

    const addExpense_handler = (e) => {
        e.preventDefault();
        props.addExpense({
            amount: amount.current.value,
            date: expenseDate.current.value,
            category: category.current.value,
            descr: descr.current.value
        })
    }

    return (
        <React.Fragment>
            <Col lg={8}>
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
                <Button className={`primaryBtn px-5 py-2 mt-3 d-block m-auto fs-3`} onClick={addExpense_handler}>Add Expense</Button>
            </Col>
        </React.Fragment>
    )
}
