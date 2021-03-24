import { FiArrowRight } from "react-icons/fi";
import { signIn, useSession } from "next-auth/client";
import Redirect from "../components/Redirect";
import Head from "next/head";
import styles from "../styles/pages/Login.module.css";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://pomodoro-proglima.vercel.app/";

export default function Login() {
  const [session] = useSession();

  if (session)
    return <Redirect to={URL} />;

  return (
    <>
      <Head>
        <title>Login | Pomodoro-proglima</title>
      </Head>
      {/* <img
        className={styles.backgroundLogo}
        src="Pomodo Proglima.png"
        alt="big-logo-login"
      /> */}
      <div className={styles.container}>
        <section>
          <div className={styles.loginContainer}>
            <img
              className={styles.logoLogin}
              src="Pomodo Proglima-2.png"
              alt="logo-login"
            />
            <h2>Bem-vindo</h2>
            <div>
              <img src="icons/Github.svg" alt="github-logo" />
              <p>
                Faça login com seu Github <br /> para começar
              </p>
            </div>
            <button
              onClick={() => signIn("github")}
              className={styles.githubLogin}
            >
              <span>Logar com Github</span>
              <div>
                <FiArrowRight size={36} color="#fff" />
              </div>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
