import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Script from 'next/script';

const Home: NextPage = () => {
  return (
    <main>
      <Script src="/js/snarkjs.min.js"/>
      <Navbar />
      <Panel />
    </main>
  );
};

export default Home;
