import { render, screen } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import { Provider } from "react-redux";
import store from "../../redux-store";

test("checking authntication text", () => {
    render(<Provider store={store}><ForgetPassword /></Provider>);
    const btnElement = screen.getByText("Send Email Verification", { exact: false });
    expect(btnElement).toBeInTheDocument()
})