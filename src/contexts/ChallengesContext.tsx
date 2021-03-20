import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
import { useSession } from "next-auth/client";
import axios from "axios";
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  name: string;
  profilePicture: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [session]: any = useSession();
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [level, setLevel] = useState(1);
  const [totalExperience, setTotalExperience] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0); //Muda a barra de experiência do user
  const [challengesCompleted, setChallengesCompleted] = useState(0); //Desafios completados
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  //4 é o fator de XP do usuário
  //2 é a potência
  const experienceNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    async function getUser() {
      if (session) {
        const { data } = await axios.post("api/server/user", {
          userId: session.userId,
        });
        setLevel(data.level);
        setCurrentExperience(data.currentExperience);
        setChallengesCompleted(data.challengesCompleted);
        setTotalExperience(data.totalExperience);
        setName(data.name);
        setProfilePicture(data.image);
      }
    }
    getUser();
  }, []);

  //A função contida no primeiro parâmetro executa uma unica vez assim que o componente é exibido
  //em tela. Isso ocorre toda vez que for usado o useEffect contendo o segundo parâmetro como um array vázio.
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    //Se o usuário deu permissão para enviar notificações pelo browser.
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio! 😉', {
        body: `Valendo ${challenge.amount}xp!`,
        vibrate: [200, 100, 200]
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    //let it changes: Variavel let poderá receber um valor no futuro
    let finalExperience = currentExperience + amount;
    let newLevel = level;
    if (finalExperience >= experienceNextLevel) {
      finalExperience = finalExperience - experienceNextLevel;
      levelUp();
      newLevel = level + 1;
    }

    setCurrentExperience(finalExperience);
    //Após finalizar o desafio, reseta o desafio
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setTotalExperience(totalExperience + amount);
    updateUser(
      newLevel,
      finalExperience,
      totalExperience + amount,
      challengesCompleted + 1
    );
  }

  async function updateUser(
    level: number,
    currentExperience: number,
    totalExperience: number,
    challengesCompleted: number
  ) {
    const response = await axios.post("api/server/updateUser", {
      level,
      currentExperience,
      totalExperience,
      challengesCompleted,
      userId: session.userId,
    });
  }

  return (
    <ChallengesContext.Provider
      value={{
        name,
        profilePicture,
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}>
      { children}
      {isLevelUpModalOpen && <LevelUpModal/> }
    </ChallengesContext.Provider>
  )
}
