import Styles from '../../styles/Components/ExperienceBar.module.css';
export function ExperienceBar() {
  return (
    <header className={Styles.experienceBar}>
      <span>0 XP</span>
      <div>
        <div style={ {width: '50%'} } />
        <span className={Styles.currentExperience} style={{ left: '50%' }}>
          300 XP
        </span>
      </div>
      <span>600 XP</span>
    </header>
  );
}