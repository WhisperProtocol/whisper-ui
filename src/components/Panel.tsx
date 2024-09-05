import React, { useState } from 'react';
import styles from './styles/Panel.module.css';
import DepositCard from './panels/Deposit';

const Panel = () => {
  const [isDeposit, setIsDeposit] = useState(true);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsDeposit(!isDeposit);
  };

  return (
    <div className={styles.panel}>
      <button
        className={`${styles.toggle} ${isDeposit ? styles.toggleDeposit : styles.toggleWithdraw}`}
        onClick={handleToggle}
        aria-label={isDeposit ? 'Switch to Withdraw' : 'Switch to Deposit'}
      ></button>
      <div className={styles.cardContainer}>
        {isDeposit ? <DepositCard />: <div>Withdraw Card Placeholder</div>}
      </div>
    </div>
  );
};

export default Panel;