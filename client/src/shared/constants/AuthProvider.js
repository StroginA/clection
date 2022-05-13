import { useState } from "react";
import { AuthContext } from "./AuthContext";
import localStorageKeys from "./localStorageKeys";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function AuthProvider (props) {
    const [token, setToken] = useState(localStorage.getItem(localStorageKeys.SESSION_TOKEN));
    const [user, setUser] = useState("");
    const [isAdmin, setAdmin] = useState(false)
    const navigate = useNavigate();

    const verifySession = async () => {
        /*
        Verify the current session token and check if you are admin/blocked/deleted. 
        Sign out if blocked/deleted.
        If session expired, redirect to signin.
        Returns 200/401/403/'error' (or should)
        */
        if (token) {
            axios.get(
                '/api/v1/verify-session',
                {
                    params: {
                        token: localStorage.getItem(localStorageKeys.SESSION_TOKEN)
                    }
                }
            )
                .then(
                    res => {
                        signin(res.data);
                        return 200
                    }
                )
                .catch(
                    err => {
                        if (err.response.status === 401) {
                            signout();
                            navigate("signin", {state:{sessionExpired: true}});
                            return 401
                        } else {
                            console.log(err.response.message)
                        } return 'error'
                    }
                )
        } else return 401
    }

    const signin = (auth) => {
        // Accepts an object {user, token, isAdmin}
        setUser(auth.user);
        setToken(auth.token);
        setAdmin(auth.isAdmin)
        localStorage.setItem(localStorageKeys.SESSION_TOKEN, auth.token)
    }

    const signout = () => {
        setToken("");
        setUser("");
        setAdmin(false)
        localStorage.setItem(localStorageKeys.SESSION_TOKEN, "")
    }

    return (
        <AuthContext.Provider value={
            {user, token, isAdmin, signin, signout, verifySession}
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;