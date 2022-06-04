import { createContext, useContext, useMemo, useState } from "react";
import crypto from "crypto-js";

// TODO: use graphql generated types
interface Login {
  token: string;
  email: string;
  password: string;
  __typename?: string;
}

interface AuthContextType {
  token?: string | null;
  secretKey?: string | null;
  login: (data: Login) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProps) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [secretKey, setSecretKey] = useState<string | null>(null);

  /** login callback */
  function login({ token, email, password }: Login) {
    setToken(token);
    localStorage.setItem("token", token);

    const key = crypto.PBKDF2(password, email, {
      keySize: 32,
      iterations: 100000,
      hasher: crypto.algo.SHA256,
    });

    const base64Key = key.toString(crypto.enc.Base64)

    console.log({base64Key})

    setSecretKey(base64Key);
  }

  function logout() {
    setToken(null);
    setSecretKey(null);
    localStorage.removeItem("token");
  }

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      secretKey,
    }),
    [token, login, logout, secretKey]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
