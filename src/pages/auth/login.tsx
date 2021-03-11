import { useContext } from "react";

import Input from "../../components/Inputs";
import styles from "../../styles/pages/Login.module.css";
import { AuthContext } from "../../contexts/auth-context";

export default function Login() {
	const { fetchUser, handleChange } = useContext(AuthContext);

	return (
		<div className={styles.container_login}>
			<div className={styles.login_wrapper}>
				<div />
				<div className={styles.form_wrapper}>
					<img className={styles.logo} src="/Logo.svg" alt="moveit" />
					<div>
						<h1>Bem vindo</h1>

						<div className={styles.descripition}>
							<img src="/icons/Github.svg" alt="github" />
							<p>Faça login com seu Github para começar</p>
						</div>

						<Input onChange={handleChange} onClick={fetchUser} />
					</div>
				</div>
			</div>
		</div>
	);
}