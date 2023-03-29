import React, { useState } from "react";

const AuthContext = React.createContext({
    tokenId: null,
    isLoggedIn: false,
    loginStatus_handler: () => { }
})

export default AuthContext;

const AuthContextProvider = (props) => {
    const [loginStatus, setLoginStatus] = useState({
        tokenId: null,
        isLoggedIn: false
    })

    const loginStatus_handler = (tokenId) => {
        if (tokenId) {
            setLoginStatus({
                tokenId: tokenId,
                isLoggedIn: true
            })
        }
        else {
            setLoginStatus({
                tokenId: null,
                isLoggedIn: false
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            tokenId: loginStatus.tokenId,
            isLoggedIn: loginStatus.isLoggedIn,
            loginStatus_handler: loginStatus_handler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };