import { useState } from "react";
import { AuthContext } from "./AuthContext";



function AuthProvider (props) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    const signin = (auth) => {
        // Accepts an object {user, token}
        setUser(auth.user);
        setToken(auth.token);
    }

    const signout = () => {
        setToken("");
        setUser("");
    }

    return (
        <AuthContext.Provider value={
            {user, token, signin, signout}
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;