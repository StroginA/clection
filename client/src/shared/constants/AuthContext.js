import { createContext } from "react";

export const AuthContext = createContext({
    user: "",
    token: "",
    signin: () => {},
    signout: () => {},
    report: () => {}
});