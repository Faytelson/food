import { useContext } from "react";
import AuthContext from "@context/auth/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Контекст должен быть использован внутри провайдера");
  return context;
};
