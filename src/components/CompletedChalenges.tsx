import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChalenges.module.css';
export function CompletedChalenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{ challengesCompleted }</span>
    </div>
  );
}