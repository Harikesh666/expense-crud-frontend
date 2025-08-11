import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const stored = localStorage.getItem("authData");
        return stored ? JSON.parse(stored) : { user: null, token: null };
    });

    const login = (user, token) => {
        const newAuthData = { user, token };
        setAuthData(newAuthData);
        localStorage.setItem("authData", JSON.stringify(newAuthData));
    };

    const logout = () => {
        setAuthData({ user: null, token: null });
        localStorage.removeItem("authData");
    };

    return (
        <UserContext.Provider
            value={{
                user: authData.user,
                token: authData.token,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
