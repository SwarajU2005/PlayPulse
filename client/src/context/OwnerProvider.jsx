import { createContext, useState } from "react";

export const OwnerContext = createContext(null);

const OwnerProvider = ({ children }) => {
    const [ownerAccount, setOwnerAccount] = useState({ username: "", name: ""});

    return (
        <OwnerContext.Provider value={{ ownerAccount, setOwnerAccount }}>
            {children}
        </OwnerContext.Provider>
    );
};

export default OwnerProvider;
