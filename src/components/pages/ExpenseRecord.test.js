import { render, screen } from "@testing-library/react";
import ExpenseRecord from "./ExpenseRecord";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux-store";

test("checking expense table heading date", () => {
    render(<Provider store={store}><MemoryRouter><ExpenseRecord /></MemoryRouter></Provider>);
    const authElement = screen.getByText("date", { exact: false });
    expect(authElement).toBeInTheDocument()
})

test("checking expense table heading amount", () => {
    render(<Provider store={store}><MemoryRouter><ExpenseRecord /></MemoryRouter></Provider>);
    const authElement = screen.getByText("amount", { exact: false });
    expect(authElement).toBeInTheDocument()
})

test("checking expense table heading description", () => {
    render(<Provider store={store}><MemoryRouter><ExpenseRecord /></MemoryRouter></Provider>);
    const authElement = screen.getByText("Description", { exact: false });
    expect(authElement).toBeInTheDocument()
})

test("checking expense table heading category", () => {
    render(<Provider store={store}><MemoryRouter><ExpenseRecord /></MemoryRouter></Provider>);
    const authElement = screen.getByText("Category", { exact: false });
    expect(authElement).toBeInTheDocument()
})

test("checking no expense status", () => {
    render(<Provider store={store}><MemoryRouter><ExpenseRecord /></MemoryRouter></Provider>);
    const authElement = screen.getByText("No Expenses Found Yet...", { exact: false });
    expect(authElement).toBeInTheDocument()
})