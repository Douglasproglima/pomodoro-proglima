import { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

interface AuthType {
	children: ReactNode;
}

interface AuthContextTypes {
	handleChange: (param: void) => void;
	fetchUser: () => Promise<any>;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: AuthType) {
  const [username, setUserName] = useState("");
  const router = useRouter();
  
  async function fetchUser() {
    if (!username) return null;

		try {
			const response = await axios.get(
				"https://api.github.com/users/" + username
			);

			Cookies.set("userImage", response?.data?.avatar_url);
			Cookies.set("userName", response?.data?.name);
			Cookies.set("userLogin", response?.data?.login);

			router.push("/");
		} catch (error) {
			alert("Usuário não encontrado!!");
		}
  }

  function handleChange(param) {
		setUserName(param.target.value);
  }
  
  return (
		<AuthContext.Provider value={{ handleChange, fetchUser }}>
			{children}
		</AuthContext.Provider>
	);
}