import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceNextLevel } = useContext(ChallengesContext);
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 XP</span>
      <div>
        <div style={ {width: `${percentToNextLevel}%`} } />
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          { currentExperience } XP
        </span>
      </div>
      <span>{ experienceNextLevel } XP</span>
    </header>
  );
}