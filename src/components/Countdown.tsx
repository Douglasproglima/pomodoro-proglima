import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight]  = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight]  = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countDownContainer}>
        <span className="sr-only">00:</span> {/* mostar valor de 0 horas apenas para leitores de tela*/}
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button disabled className={styles.countdownButton}>
          {/* 😀✅✔🟢✔️✓  ☑️ 🗹 ✔️ ✓*/}
          Ciclo Finalizado <span className="icon-">✔️</span>
        </button>
      ) : (
        <>
          { isActive ? (
            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
              {/* ☓ ✗ ✖ */}
              Abandonar o Ciclo <span className="icon-">✖</span>
              {/* <div 
                className={styles.dynamicTimerBar} 
                style={{width: `${timePassedPercentage()*100}%`}} >
              </div> */}
            </button>
          ) :(
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar Ciclo <span className="icon-">▶</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}