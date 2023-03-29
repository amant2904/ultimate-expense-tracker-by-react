import React from "react";

const AuthContext = React.createContext({
    tokenId: null,
    isLoggedIn: false,
    loginStatus_handler: () => { }
})

export default AuthContext;

const AuthContextProvider = (props) => {
    return (
        <AuthContext.Provider value={{
            tokenId: null,
            isLoggedIn: false,
            loginStatus_handler: () => { }
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };