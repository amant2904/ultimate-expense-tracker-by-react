import React, { useState } from "react";

const AuthContext = React.createContext({
    tokenId: null,
    isLoggedIn: false,
    loginStatus_handler: () => { },
    fullName: null,
    photoUrl: null
})

export default AuthContext;

const AuthContextProvider = (props) => {
    const [loginStatus, setLoginStatus] = useState({
        tokenId: null,
        isLoggedIn: false,
        fullName: null,
        photoUrl: null
    })

    const loginStatus_handler = (tokenId, data, profilePhoto) => {
        if (tokenId) {
            setLoginStatus({
                tokenId: tokenId,
                isLoggedIn: true,
                fullName: data.displayName,
                photoUrl: profilePhoto
            })
        }
        else {
            setLoginStatus({
                tokenId: null,
                isLoggedIn: false,
                fullName: null,
                photoUrl: null
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            tokenId: loginStatus.tokenId,
            isLoggedIn: loginStatus.isLoggedIn,
            loginStatus_handler: loginStatus_handler,
            fullName: loginStatus.fullName,
            photoUrl: loginStatus.photoUrl
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };