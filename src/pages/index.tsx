import { GetServerSideProps } from 'next';

import { CompletedChalenges } from '../components/CompletedChalenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesContext, ChallengesProvider } from "../contexts/ChallengesContext";
import Redirect from "../components/Redirect";
import Head from 'next/head';
import { useSession, session } from "next-auth/client";

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  const [session]: any = useSession();

  if (!session) {
    return <Redirect to="/login" />;
  }

  return (
    <ChallengesProvider>
      <div className={styles.container}>
        <Head>
          <title>Inicio | Pomodoro-proglima</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}
