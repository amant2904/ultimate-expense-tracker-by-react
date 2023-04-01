import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import classes from "./ExpenseItem.module.css"

export default function ExpenseItem(props) {
    const [isEditing, setIsEditing] = useState(false);

    const idRef = useRef();
    const date = useRef();
    const amount = useRef();
    const descr = useRef();
    const category = useRef();

    const [id, setId] = useState();
    const [newDate, setNewDate] = useState();
    const [newAmount, setNewAmount] = useState();
    const [newDescr, setNewDescr] = useState();
    const [newCategory, setNewCategory] = useState();

    const newDate_handler = (e) => {
        setNewDate(e.target.value);
    }

    const newAmount_handler = (e) => {
        setNewAmount(e.target.value);
    }

    const newDescr_handler = (e) => {
        setNewDescr(e.target.value);
    }

    const newCategory_handler = (e) => {
        setNewCategory(e.target.value);
    }

    const editExpense_handler = () => {
        setIsEditing(true);
        setId(idRef.current.innerText);
        setNewDate(date.current.innerText);
        setNewAmount(amount.current.innerText);
        setNewDescr(descr.current.innerText);
        setNewCategory(category.current.innerText);
    }

    const deleteExpense_handler = () => {
        props.deleteExpense(idRef.current.innerText)
    }

    const editFormSubmit_handler = async () => {
        const details = {
            id: id,
            date: newDate,
            amount: newAmount,
            descr: newDescr,
            category: newCategory
        }
        await props.editExpense(details);
        setIsEditing(false);
    }

    const cancelEditing_handler = () => {
        setIsEditing(false);
    }

    return (
        <React.Fragment>
            {!isEditing && <tr className={`${classes.table_row}`}>
                <td ref={date}>{props.expense.date}</td>
                <td>Rs. <span ref={amount}>{props.expense.amount}</span></td>
                <td ref={descr}>{props.expense.descr}</td>
                <td ref={category}>{props.expense.category}</td>
                {props.edit && <td>
                    <Button variant='warning' className={`btn`} onClick={editExpense_handler}>Edit</Button>
                </td>}
                {props.dlt && <td>
                    <Button variant='danger' className={`btn`} onClick={deleteExpense_handler}>Delete</Button>
                </td>}
                <td ref={idRef} hidden>{props.expense.id}</td>
            </tr>}
            {isEditing && <tr className={classes.tableRow_form}>
                <td>
                    <Form.Control type="date" onChange={newDate_handler} value={newDate} />
                </td>
                <td>
                    <Form.Control type="number" onChange={newAmount_handler} value={newAmount} />
                </td>
                <td>
                    <Form.Control as="textarea" rows={1} onChange={newDescr_handler} value={newDescr} />
                </td>
                <td>
                    <Form.Select aria-label="Default select example" onChange={newCategory_handler} value={newCategory}>
                        <option value="travel">Travel</option>
                        <option value="food" >Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="study">Study</option>
                        <option value="health">Health</option>
                        <option value="fashion">Fashion</option>
                    </Form.Select>
                </td>
                <td>
                    <Button variant='info' className={`btn text-light`} onClick={editFormSubmit_handler}>Done</Button>
                </td>
                <td>
                    <Button variant='danger' className={`btn`} onClick={cancelEditing_handler}>cancel</Button>
                </td>
            </tr>}
        </React.Fragment>
    )
}
