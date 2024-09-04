import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';

const Home: NextPage = () => {
  return (
    <main>
      <Navbar />
      <Panel />
    </main>
  );
};

export default Home;
