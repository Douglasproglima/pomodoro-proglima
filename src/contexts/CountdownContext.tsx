import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

const INITIAL_TIME = 0.1 * 60;
let COUNTDOWNTIMEOUT: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  //Recebe informação via ContextAPI
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown(){
    setIsActive(true);
  }

  useEffect(() => {
    if(isActive && time > 0) {
      COUNTDOWNTIMEOUT = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if( isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);

      //Acessa as informações através do contextAPI
      startNewChallenge();
    }
  }, [isActive, time]);

  function resetCountdown() {
    clearTimeout(COUNTDOWNTIMEOUT);
    setIsActive(false);
    setTime(INITIAL_TIME);
    setHasFinished(false);
  }

  return (
    <>
      <CountdownContext.Provider
        value={{
          minutes,
          seconds,
          hasFinished,
          isActive,
          startCountdown,
          resetCountdown,
        }}>
        {children}
      </CountdownContext.Provider>
    </>
  )
}
