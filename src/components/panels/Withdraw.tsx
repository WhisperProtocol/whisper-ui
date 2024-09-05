import React from "react";
import styles from "../styles/Withdraw.module.scss";
import radioStyles from "../styles/RadioButtons.module.scss";

const WithdrawCard = () => {
  return (
    <div id="page" className={styles.page}>
      <div id="main" className={styles.main}>
        <div className={styles.productContainer}></div>
        <div className={styles.card}>
          <h1>Withdraw ETH</h1>
          <div className={radioStyles.radiogroup}>
            <div className={radioStyles.wrapper}>
              <input
                className={radioStyles.state}
                type="radio"
                name="withdraw"
                id="w1"
                value="w1"
              />
              <label className={radioStyles.label} htmlFor="w1">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>0.001 ETH</span>
              </label>
            </div>
            <div className={radioStyles.wrapper}>
              <input
                className={radioStyles.state}
                type="radio"
                name="withdraw"
                id="w2"
                value="w2"
              />
              <label className={radioStyles.label} htmlFor="w2">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>0.005 ETH</span>
              </label>
            </div>
            <div className={radioStyles.wrapper}>
              <input
                className={radioStyles.state}
                type="radio"
                name="withdraw"
                id="w3"
                value="w3"
              />
              <label className={radioStyles.label} htmlFor="w3">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>&nbsp;0.01 ETH</span>
              </label>
            </div>
          </div>
          <form action="#">
            <button className={styles.EchoButton}>
              <span>Withdraw</span>
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