import { createContext } from "react";

export const AuthContext = createContext({
    user: "",
    token: "",
    isAdmin: false,
    signin: () => {},
    signout: () => {},
    verifySession: () => {}
});