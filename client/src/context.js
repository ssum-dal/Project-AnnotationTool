import React, { useState, useContext } from "react";

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [User, setUser] = useState({
    name: "yeji",
    loggedIn: false,
  });
  const logUserIn = () => setUser({ ...User, loggedIn: true });
  const logUserOut = () => setUser({ ...User, loggedIn: false });
  return (
    <UserContext.Provider value={{ User, fn: { logUserIn, logUserOut } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { User } = useContext(UserContext);
  return User;
};

export const useFns = () => {
  const { fn } = useContext(UserContext);
  return fn;
};

export default UserContextProvider;
