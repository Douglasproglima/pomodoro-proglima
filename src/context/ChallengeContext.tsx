import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0); //Muda a barra de experiência do user
  const [challengesCompleted, setChallengesCompleted] = useState(0); //Desafios completados
  const [activeChallenge, setActiveChallenge] = useState(null);

  //4 é o fator de XP do usuário
  //2 é a potência
  const experienceNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    //let it changes: Variavel let poderá receber um valor no futuro
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceNextLevel) {
      finalExperience = finalExperience - experienceNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    //Após finalizar o desafio, reseta o desafio
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      experienceNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
    }}>
      { children }
    </ChallengesContext.Provider>
  )
}