import React, { createContext, useContext, useEffect, useState } from "react";

export const Crypto = createContext(); // Export the context itself

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};
export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto); // Custom hook to use the context
};
