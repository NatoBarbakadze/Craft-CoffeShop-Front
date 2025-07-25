import { createContext, useState } from "react";

export const CurrencyContext=createContext(undefined)

const CurrencyContextProvider=({children})=>{
    const [currency, setCurrency]=useState("GEL")

    const toggleCurrency=()=>{
        setCurrency (prevCurrency => (prevCurrency ==="USD"? "GEL" : "USD"));
    }
    return (
        <CurrencyContext.Provider value={{currency, toggleCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )
}
export default CurrencyContextProvider

