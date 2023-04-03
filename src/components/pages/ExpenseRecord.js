import React, { useEffect, useState } from 'react'
import classes from "./ExpenseRecord.module.css"
import { Container, Row, Table, Col, Button } from 'react-bootstrap'
import NewExpense from './NewExpense';
import Overlay from "../UI/Overlay";
import ExpenseItem from '../layouts/ExpenseItem';
import Filter from '../layouts/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { expensesActions } from '../../redux-store/expensesSlice';

export default function ExpenseRecord() {

    // api url --------------------------
    const database_api = useSelector(state => state.expenses.database_api);
    const userEmail = localStorage.getItem("user_email");
    let filtered_email = "";

    for (let i in userEmail) {
        if (userEmail[i] !== "." && userEmail[i] !== "@") {
            filtered_email += userEmail[i]
        }
    }

    const api_url = `${database_api}/${filtered_email}`

    // ___________________________________

    const [overlay, setOverlay] = useState({
        isTrue: false,
        message: ""
    })
    const [dlt, setDlt] = useState(false);
    const [edit, setEdit] = useState(true);
    const [newExpense, setNewExpense] = useState(false);
    const expenses = useSelector(state => state.expenses.allExpense);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const dispatch = useDispatch();

    const newExpense_handler = () => {
        setNewExpense((prv) => !prv);
        setFilteredExpenses(expenses);
    }

    const edit_dlt_handler = () => {
        setEdit((prv) => !prv);
        setDlt((prv) => !prv);
    }

    const overlayClose_handler = () => {
        setOverlay({
            isTrue: false,
            message: ""
        })
    }

    const [filterYear, setFilterYear] = useState("all");
    const filterExpense_handler = (filterValue) => {

        setFilterYear(filterValue)
        if (filterValue === "all") {
            setFilteredExpenses(expenses);
        }
        else {
            const filterExpenses = expenses.filter((expenseItem) => {
                const year = new Date(expenseItem.date).getFullYear();
                if (year.toString() === filterValue) {
                    return expenseItem;
                }
                return null;
            })
            setFilteredExpenses(filterExpenses);
        }
    };

    const add_expense = (obj) => {
        // add in expenses
        dispatch(expensesActions.addExpense(obj));
        setNewExpense(false);
    }

    const editExpense_handler = async (newDetails) => {
        try {
            const res = await fetch(`${api_url}/${newDetails.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(newDetails)
            })
            const data = await res.json();
            // console.log(data);
            if (!res.ok) {
                throw new Error(data.error);
            }

            // edit in expenses
            const index = expenses.findIndex((expense) => {
                return expense.id === newDetails.id
            })
            const newExpenses = [...expenses];
            newExpenses[index] = newDetails;
            dispatch(expensesActions.editExpense(newExpenses));
            return true;
        }
        catch (err) {
            setOverlay({
                isTrue: true,
                message: err.message
            })
            return false;
        }
    }

    const deleteExpense_handler = async (id) => {
        try {
            const res = await fetch(`${api_url}/${id}.json`, {
                method: 'DELETE'
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }

            // delete from expenses
            const index = expenses.findIndex((expense) => {
                return expense.id === id
            })
            const newExpenses = [...expenses];
            newExpenses.splice(index, 1);
            dispatch(expensesActions.editExpense(newExpenses));

            setOverlay({
                isTrue: true,
                message: "Deleted Successfully"
            })
        }
        catch (err) {
            console.log(err)
            setOverlay({
                isTrue: true,
                message: "Unable To Delete"
            })
        }
    }

    useEffect(() => {
        const firstFetch = async () => {
            try {
                const res = await fetch(`${api_url}.json`)
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
                dispatch(expensesActions.editExpense(all_expenses));
                setFilteredExpenses(all_expenses);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        firstFetch();
    }, [api_url, dispatch])

    useEffect(() => {
        if (filterYear) {
            filterExpense_handler(filterYear);
        }
    }, [expenses]);



    return (
        <React.Fragment>
            {overlay.isTrue && <Overlay message={overlay.message} onClick={overlayClose_handler} />}
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
                        <Filter filterExpense={filterExpense_handler} />
                        <Table className={``}>
                            <thead>
                                <tr className={`${classes.table_row}`}>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((expense) => {
                                    return <ExpenseItem key={expense.id} edit={edit} dlt={dlt} expense={expense} editExpense={editExpense_handler} deleteExpense={deleteExpense_handler} />
                                })}
                                {filteredExpenses.length === 0 && <tr>
                                    <td colSpan={4}><h2 className='text-center fs-4 py-4'>No Expenses Found Yet...</h2></td>
                                </tr>}
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
