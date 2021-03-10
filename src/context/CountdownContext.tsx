import {
  createContext,
  ReactNode,
} from 'react';
import { ChallengeContext } from './ChallengeContext';

interface CountdownContextData { }

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {

  return (
    <>
      <CountdownContext.Provider value={{}}>
        {children}
      </CountdownContext.Provider>
    </>
  )
}
