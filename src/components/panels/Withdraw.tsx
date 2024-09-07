import React from "react";
import styles from "../styles/Withdraw.module.scss";
import radioStyles from "../styles/RadioButtons.module.scss";

const WithdrawCard = () => {
  return (
    <div id="page" className={styles.page}>
      <div id="main" className={styles.main}>
        <div className={styles.productContainer}></div>
        <div className={styles.card}>
          <div className={styles.inputWrapper}>
            <input type="password" required/>
            <label htmlFor="user">Proof</label>
          </div>
          <form action="#">
            <button className={styles.EchoButton}>
              <span>Echo Out</span>
            </button>
          </form>
        </div>
        {/* <div className={styles.priceContainer}>
          <strong>149,95 €</strong>
          <small>Inc. shipping & tax</small>
        </div> */}
      </div>
    </div>
  );
};

export default WithdrawCard;