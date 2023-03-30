import React, { useState } from "react";

const AuthContext = React.createContext({
    tokenId: null,
    isLoggedIn: false,
    loginStatus_handler: () => { },
    fullName: null,
    photoUrl: null,
    verified: false,
    verificationHandler: () => { }
})

export default AuthContext;

const AuthContextProvider = (props) => {
    const [loginStatus, setLoginStatus] = useState({
        tokenId: null,
        isLoggedIn: false,
        fullName: null,
        photoUrl: null
    })

    const [verified, setVerified] = useState(false);

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

    const verification_handler = (status) => {
        if (status === true) {
            setVerified(true);
        }
        else {
            setVerified(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            tokenId: loginStatus.tokenId,
            isLoggedIn: loginStatus.isLoggedIn,
            loginStatus_handler: loginStatus_handler,
            fullName: loginStatus.fullName,
            photoUrl: loginStatus.photoUrl,
            verified: verified,
            verificationHandler: verification_handler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };