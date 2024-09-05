import React from 'react';
import styles from '../styles/Deposit.module.scss';

const DepositCard = () => {
  return (
    <div id="page" className={styles.page}>
      <div id="main" className={styles.main}>
        <div className={styles.productContainer}>
        </div>
        <div className={styles.card}>
          <form action="#">
            <button className={styles.depositButton}>BUY NOW
            </button>
          </form>
        </div>
        <div className={styles.priceContainer}>
          <strong>149,95 €</strong>
          <small>Inc. shipping & tax</small>
        </div>
      </div>
    </div>
  );
};

export default DepositCard;