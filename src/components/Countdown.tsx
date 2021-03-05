import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;
export function Countdown() {
  const initTime = 0.1 * 60; //25*60;
  const [time, setTime] = useState(initTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight]  = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight]  = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setIsActive(true);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if( isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initTime);
  }

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