import React from 'react'
import { Row } from 'react-bootstrap'
import classes from "./Filter.module.css"

export default function Filter(props) {

    const selectYear_handler = (e) => {
        props.filterExpense(e.target.value);
    }

    return (
        <Row className={`justify-content-between align-items-center ${classes.filterRow}`}>
            <h2 className={`w-auto`}>Filter By Year :-</h2>
            <select name="year" id="year" className={`w-auto`} onChange={selectYear_handler}>
                <option value="all">All</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                {/* <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option> */}
            </select>
        </Row>
    )
}
