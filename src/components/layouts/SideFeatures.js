import React from 'react'
import { Col } from 'react-bootstrap'
import classes from "./SideFeatures.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { themeActions } from '../../redux-store/themeSlice'
import { Link } from 'react-router-dom'

export default function SideFeatures() {
    const themeMode = useSelector(state => state.theme.mode);
    const expenses = useSelector(state => state.expenses.allExpense);
    const dispatch = useDispatch();
    const themeMode_handler = () => {
        dispatch(themeActions.changeTheme());
    }

    let downloadHandler = () => {
        // console.log(expenses);
        let finalArr = [["Date", "Amount", "Description", "Category"]];
        for (let i = 0; i < expenses.length; i++) {
            let arr = [];
            arr.push(expenses[i].date.toString());
            arr.push(expenses[i].amount.toString());
            arr.push(expenses[i].descr.toString());
            arr.push(expenses[i].category.toString());
            finalArr.push(arr);
        }
        function makeCsv(data) {
            return data.map(data => data.join(",")).join("\n")
        }
        let data = makeCsv(finalArr);
        const blob1 = new Blob([data]);
        let aTag = document.createElement("a");
        aTag.href = URL.createObjectURL(blob1);
        aTag.setAttribute("download", "expense-records.csv");
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }
    return (
        <Col lg={2} className={`${classes.sideFeatures}`}>
            <button onClick={themeMode_handler} className={`${classes.side_btn} ${(themeMode) ? classes.darkThemeBtn : classes.lightThemeBtn}`}>{(themeMode) ? "Enable Dark Mode" : "Enable Light Mode"}</button>
            <button onClick={downloadHandler} id='d-link' className={`${classes.side_btn} ${classes.downloadBtn}`}>Download expenses</button>
        </Col>
    )
}
