import { render, screen } from "@testing-library/react";
import AuthenticationForm from "./AuthenticationForm";
import { Provider } from "react-redux";
import store from "../../redux-store";

test("form input email", () => {
    render(<Provider store={store}><AuthenticationForm /></Provider>);
    const formElement = screen.getByText("email address", { exact: false });
    expect(formElement).toBeInTheDocument()
})