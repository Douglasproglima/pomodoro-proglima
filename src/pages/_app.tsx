import '../styles/global.css';
import { SideBar } from "../components/SideBar";
import { Provider } from "next-auth/client";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    /*
    ChallengeContext: Object
    ChallengeContext.Provider: Component
    Todos os elementos dentro do <ChallengeContext.Provider /> terão acesso a todos os dados que forem
    armazenados dentro do contexto.

    Como o MyApp() está por volta de toda aplicação, então toda aplicação terá acesso aos dados que
    estarão dentro do contexto de ChallengeContext;

    Resumo: O contexto é uma forma de obter acesso a informações de diversos locais da aplicação, ou
    comunicação entre componentes.
    */
    /*<Component {...pageProps} />*/
    <Provider session={pageProps.session}>
      {router.pathname !== "/login" ? <SideBar /> : ""}
      {console.log(pageProps.session+" - "+router.pathname)}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
