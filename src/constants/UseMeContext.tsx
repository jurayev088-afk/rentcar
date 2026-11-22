"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Account = {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role: "RENTER" | "OWNER";
  companyName?: string;
  stir?: string;
};

export type UserContextType = {
  user: Account | null;
  users: Account[];
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<Account | null>>;
  logIn: (registeredUser: Account) => void;
  logOut: () => void;
  registerUser: (newUser: Account) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UseMeContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);
  const [users, setUsers] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedUsers = localStorage.getItem("registeredUsers");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user, loading]);

  const registerUser = (newUser: Account) => {
    const updateUsers = [...users, newUser];

    setUsers(updateUsers);
    setUser(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(updateUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const logOut = () => setUser(null);

  const logIn = (registeredUser: Account) => {
    localStorage.setItem("currentUser", JSON.stringify(registeredUser));
    setUser(registeredUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        loading,
        setUser,
        logIn,
        logOut,
        registerUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser UseMeContext ichida ishlatilishi kerak");
  }
  return context;
};
