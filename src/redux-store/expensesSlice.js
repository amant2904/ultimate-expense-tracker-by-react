import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allExpense: [],
    totalAmount: 0,
    database_api: "https://ultimate-expense-tracker-8f09c-default-rtdb.firebaseio.com"
}

const expensesSlice = createSlice({
    name: "Expenses",
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            state.allExpense = [...state.allExpense, action.payload]
            state.totalAmount += parseInt(action.payload.amount);
        },
        editExpense(state, action) {
            state.allExpense = [...action.payload.all];
            state.totalAmount = action.payload.totalAmount;
        },
        firstFetch(state, action) {
            state.allExpense = [...action.payload];
            const total = state.allExpense.reduce((init, expense) => {
                return init += parseInt(expense.amount);
            }, 0)
            state.totalAmount = total;
        }
    }
})

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
