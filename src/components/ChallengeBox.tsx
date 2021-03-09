import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);
  
  return (
    <div className={ styles.challengeBoxContainer }>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe { activeChallenge.amount } xp</header>
          <main>
            {/* <img src="icons/body.svg" /> */}
            <img src={ `icons/${activeChallenge.type}.svg` } />
            <strong>Novo Desafio</strong>
            <p>{ activeChallenge.description }</p>
          </main>
          <footer>
            <button className={styles.challengeFailedButton} type="button" onClick={ resetChallenge }>Falhei</button>
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