import React, { createContext, useState } from "react";

export const AuthContext = createContext({ auth: {}, setAuth: (data) => {} });
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
