import { createContext, useContext, useMemo, useState } from "react";

// TODO: use graphql generated types
interface User {
  id: string;
  email: string;
  __typename?: string;
}
interface Login {
  token: string;
  user: User;
  __typename?: string;
}

interface AuthContextType {
  user?: User | null;
  token?: string | null;
  login: (data: Login) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  function login({ token, user }: Login) {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
