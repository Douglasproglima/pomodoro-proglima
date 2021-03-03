import styles from '../styles/components/CompletedChalenges.module.css';
export function CompletedChalenges() {
  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios Completos</span>
      <span>5</span>
    </div>
  );
}