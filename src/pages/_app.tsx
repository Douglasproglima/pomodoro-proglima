import '../styles/global.css';
function MyApp({ Component, pageProps }) {
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
    <Component {...pageProps} />
  )
}

export default MyApp
