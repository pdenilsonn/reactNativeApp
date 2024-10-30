import { createContext, useContext, useState, useEffect, Children } from "react";
import { getCurentUser } from "../lib/appwrite";
 

// Provide the state of the sessions. 

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({Children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurentUser()
            .then((res) => {
                if(res) {
                    setIsLogged(true);
                    setUser(res);
                } else {
                    setIsLogged(false)
                    setUser(null)
                }
            })
            
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
            
    }, []);
    
    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                loading
            }}
        >
            {Children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
