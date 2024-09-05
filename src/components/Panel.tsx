import React, { useState } from 'react';
import styles from './styles/Panel.module.css';

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
    </div>
  );
};

export default Panel;