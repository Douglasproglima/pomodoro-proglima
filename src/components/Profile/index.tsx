import styles from './index.module.css';
export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/douglasproglima.png" alt="Douglas Lima" />
      <div>
        <strong>Douglas Lima</strong>
        <p>Level 1</p>
      </div>
    </div>
  );
}