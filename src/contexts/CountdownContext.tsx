import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
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

export function CountdownProvider({ children }: CountdownProviderProps) {
  //Recebe informação via ContextAPI
  const { startNewChallenge } = useContext(ChallengesContext);

  const initTime = 0.1 * 60; //25*60;
  const [time, setTime] = useState(initTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown(){
    setIsActive(true);
  }

  let countdownTimeout: NodeJS.Timeout;

  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
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
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(initTime);
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
