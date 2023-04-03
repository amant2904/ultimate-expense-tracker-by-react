import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allExpense: [],
    database_api: "https://ultimate-expense-tracker-8f09c-default-rtdb.firebaseio.com"
}

const expensesSlice = createSlice({
    name: "Expenses",
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            state.allExpense = [...state.allExpense, action.payload]
        },
        editExpense(state, action) {
            state.allExpense = [...action.payload];
        }
    }
})

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
