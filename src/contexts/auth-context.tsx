import { createContext, ReactNode, useState } from "react";

interface AuthType {
	children: ReactNode;
}

interface AuthContextTypes {
	handleChange: (param: void) => void;
	fetchUser: () => Promise<any>;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: AuthType) {

  async function fetchUser() {
  
  }

  function handleChange(param) {
		
  }
  
  return (
		<AuthContext.Provider value={{ handleChange, fetchUser }}>
			{children}
		</AuthContext.Provider>
	);
}