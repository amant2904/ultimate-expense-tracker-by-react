import { render, screen } from "@testing-library/react";
import Authentication from "./Authentication";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux-store";

test("checking authntication text", () => {
    render(<Provider store={store}><MemoryRouter><Authentication /></MemoryRouter></Provider>);
    const authElement = screen.getByText("expense tracker", { exact: false });
    expect(authElement).toBeInTheDocument()
})