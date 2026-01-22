import { createContext } from "react";

export type SessionType = {
  email: string;
  id: string;
};

export type AuthContextType = {
  session: SessionType | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
});

export default AuthContext;
