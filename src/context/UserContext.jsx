import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

//wrapper for children inside it have access to the user and setUser state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for logged-in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
