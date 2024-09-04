import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <main>
      <Navbar />
    </main>
  );
};

export default Home;
