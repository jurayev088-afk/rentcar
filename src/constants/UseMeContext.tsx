"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext<any>(null);

export type Account = {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role: "RENTER" | "OWNER";
  companyName?: string;
  stir?: string;
};

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

  const registerUser = (newUser: Account) =>{
    const updateUsers = [...users, newUser]

    setUsers(updateUsers)
    setUser(newUser)

    localStorage.setItem("registeredUsers", JSON.stringify(updateUsers))
    localStorage.setItem("currentUser", JSON.stringify(newUser))
  }

  const logOut = () => setUser(null)

  const logIn = (registeredUser: Account) => {
    localStorage.setItem("currentUser", JSON.stringify(registeredUser));
    setUser(registeredUser);
  };

  return (
    <UserContext.Provider value={{ user, users, loading, setUser, logIn, logOut, registerUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
