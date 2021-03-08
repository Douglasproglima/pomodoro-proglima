import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {
  const hasActiveChallenge = true;
  
  return (
    <div className={ styles.challengeBoxContainer }>
      { hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          <main>
            <img src="icons/body.svg" />
            <strong>Novo Desafio</strong>
            <p>Levante e faça qualquer coisa durante 3 min.</p>
          </main>
          <footer>
            <button className={ styles.challengeFailedButton} type="button">Falhei</button>
            <button className={ styles.challengeSuccedButton} type="button">Completei</button>
          </footer>
        </div>
        ) : (
        <div className={ styles.challengeNotActine }>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
        ) }
    </div>
  )
}