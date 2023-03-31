import React, { useState } from 'react'
import classes from "./ExpenseRecord.module.css"
import { Container, Row, Table, Col, Button } from 'react-bootstrap'

export default function ExpenseRecord() {
    const expenses = [
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books rklfjkr frlkfj;lrv fklvl dlkjkfjkld dfkljdklf dklfjkldf dlkfjkd ldkjckd cldkjckd ckljdkc dlkj",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books ljkrjkf flkrjfkjr frlkjfklr",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        },
        {
            money: 200,
            descr: "purchased books",
            category: "Study",
            date: "04/29/2000"
        }
    ]

    const [edit, setEdit] = useState(true);
    const [dlt, setDlt] = useState(false);

    const edit_dlt_handler = () => {
        setEdit((prv) => !prv);
        setDlt((prv) => !prv);
    }

    return (
        <React.Fragment>
            <Container fluid className={`m-0 p-0`}>
                <h1 className={`text-center ${classes.mainHeading}`}>Expense Records</h1>
                <Row className={`mt-3`}>
                    <Col lg={2} className={`${classes.newExpense_col}`}>
                        <Col className={`${classes.fixedPart}`}>
                            <div className={`${classes.newExpense_btn}`}>
                                <button>Add New Expense</button>
                            </div>
                            {/* <div className={`${classes.deleteBtn}`}> */}
                            <Button className={`${classes.deleteBtn}`} variant={(edit) ? "danger" : "warning"} onClick={edit_dlt_handler}>{(edit) ? "Delete Expenses" : "Edit Expenses"}</Button>
                            {/* </div> */}
                        </Col>
                    </Col>
                    <Col lg={8}>
                        <Row className={`justify-content-between align-items-center ${classes.filterRow}`}>
                            <h2 className={`w-auto`}>Filter By Year :-</h2>
                            <select name="year" id="year" className={`w-auto`}>
                                <option value="2023">2023</option>
                                <option value="2023">2023</option>
                                <option value="2023">2023</option>
                                <option value="2023">2023</option>
                                <option value="2023">2023</option>
                                <option value="2023">2023</option>
                            </select>
                        </Row>
                        <Table className={``}>
                            <thead>
                                <tr className={`${classes.table_row}`}>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    {/* {edit && <th>Edit</th>} */}
                                    {dlt && <th>Delete</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((expense) => {
                                    return <tr className={`${classes.table_row}`}>
                                        <td>{expense.date}</td>
                                        <td>{expense.money}</td>
                                        <td>{expense.descr}</td>
                                        <td>{expense.category}</td>
                                        {edit && <td>
                                            <Button variant='warning' className={`btn`}>Edit</Button>
                                        </td>}
                                        {dlt && <td>
                                            <Button variant='danger' className={`btn`}>Delete</Button>
                                        </td>}
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={2}>

                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
