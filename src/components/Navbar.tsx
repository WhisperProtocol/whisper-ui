import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const [isKycEnabled, setIsKycEnabled] = useState(false);

  const handleKycClick = () => {
    setIsKycEnabled(!isKycEnabled);
  };

  return (
    <nav className={`${styles.nav} ${isKycEnabled ? styles.kycEnabled : ''}`}>
      <img src="./logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <button 
          className={`${styles.getKintoButton} ${isKycEnabled ? styles.kycButtonDisabled : ''}`} 
          onClick={handleKycClick}
        >
          Enable KYC
        </button>
        {isKycEnabled && <span className={styles.kycButtonEnabled}>KYC Verified</span>}
        <ConnectButton chainStatus='icon'/>
      </div>
    </nav>
  );
};

export default Navbar;