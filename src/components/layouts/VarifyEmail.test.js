import { render, screen } from "@testing-library/react";
import VarifyEmail from "../layouts/VarifyEmail";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux-store";
describe("verify email", () => {
    test("checking verify email text", () => {
        render(<Provider store={store}><MemoryRouter><VarifyEmail /></MemoryRouter></Provider>);
        const authElement = screen.getByText("your email is not verified", { exact: false });
        expect(authElement).toBeInTheDocument()
    })

    test("checking email testing text", () => {
        render(<Provider store={store}><MemoryRouter><VarifyEmail /></MemoryRouter></Provider>);
        const authElement = screen.getByText("VERIFY YOUR EMAIL", { exact: false });
        expect(authElement).toBeInTheDocument()
    })
})