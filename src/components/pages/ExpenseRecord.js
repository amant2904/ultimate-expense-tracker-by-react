import React, { useEffect, useState } from 'react'
import classes from "./ExpenseRecord.module.css"
import { Container, Row, Table, Col, Button } from 'react-bootstrap'
import NewExpense from './NewExpense';

export default function ExpenseRecord() {
    const [expenses, setExpenses] = useState([])

    const add_expense = (obj) => {
        setExpenses((prv) => [obj, ...prv]);
        setNewExpense(false);
    }

    const [edit, setEdit] = useState(true);
    const [dlt, setDlt] = useState(false);
    const [newExpense, setNewExpense] = useState(false);

    const edit_dlt_handler = () => {
        setEdit((prv) => !prv);
        setDlt((prv) => !prv);
    }

    const newExpense_handler = () => {
        setNewExpense((prv) => !prv);
    }
    // console.log(111);

    useEffect(() => {
        // console.log(111);
        const userEmail = localStorage.getItem("user_email");
        let filtered_email = "";

        for (let i in userEmail) {
            if (userEmail[i] !== "." && userEmail[i] !== "@") {
                filtered_email += userEmail[i]
            }
        }

        const firstFetch = async () => {
            try {
                const res = await fetch(`https://ultimate-expense-tracker-8f09c-default-rtdb.firebaseio.com/${filtered_email}.json`)
                const data = await res.json();
                // console.log(data);
                if (!res.ok) {
                    throw new Error(data.error.message);
                }
                let all_expenses = [];
                for (let key in data) {
                    all_expenses.push({
                        id: key,
                        date: data[key].date,
                        amount: data[key].amount,
                        category: data[key].category,
                        descr: data[key].descr
                    })
                }
                setExpenses(all_expenses);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        firstFetch();
    }, [])

    return (
        <React.Fragment>
            <Container fluid className={`m-0 p-0`}>
                {!newExpense && <h1 className={`text-center ${classes.mainHeading}`}>Expense Records</h1>}
                {newExpense && <h1 className={`text-center ${classes.mainHeading}`}>Add New Expense</h1>}
                <Row className={`mt-3`}>
                    <Col lg={2} className={`${classes.newExpense_col}`}>
                        <Col className={`${classes.fixedPart} `}>
                            {!newExpense && <button onClick={newExpense_handler} className={`${classes.newExpense_btn}`}>Add New Expense</button>}
                            {!newExpense && <Button className={`${classes.deleteBtn}`} variant={(edit) ? "danger" : "warning"} onClick={edit_dlt_handler}>{(edit) ? "Delete Expenses" : "Edit Expenses"}</Button>}
                        </Col>
                    </Col>
                    {!newExpense && <Col lg={8}>
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
                                    return <tr className={`${classes.table_row}`} key={expense.id}>
                                        <td>{expense.date}</td>
                                        <td>Rs. <span>{expense.amount}</span></td>
                                        <td>{expense.descr}</td>
                                        <td>{expense.category}</td>
                                        {edit && <td>
                                            <Button variant='warning' className={`btn`}>Edit</Button>
                                        </td>}
                                        {dlt && <td>
                                            <Button variant='danger' className={`btn`}>Delete</Button>
                                        </td>}
                                        <td hidden>{expense.id}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Col>}
                    {newExpense && <NewExpense cancelAdding={newExpense_handler} addExpense={add_expense} />}
                    <Col lg={2}>

                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}
