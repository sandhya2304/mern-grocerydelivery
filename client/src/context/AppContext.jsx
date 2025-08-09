import { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const value = {
    user,
    isSeller,
    showUserLogin,
    setUser,
    setIsSeller,
    setShowUserLogin
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
