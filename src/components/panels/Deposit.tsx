import React from "react";
import styles from "../styles/Deposit.module.scss";
import radioStyles from "../styles/RadioButtons.module.scss";

const DepositCard = () => {
  return (
    <div id="page" className={styles.page}>
      <div id="main" className={styles.main}>
        <div className={styles.productContainer}></div>
        <div className={styles.card}>
          <h1>ETH</h1>
          <div className={radioStyles.radiogroup}>
            <div className={radioStyles.wrapper}>
              <input
                className={radioStyles.state}
                type="radio"
                name="app"
                id="a"
                value="a"
              />
              <label className={radioStyles.label} htmlFor="a">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>0.001 ETH</span>
              </label>
            </div>
            <div className={radioStyles.wrapper}>
              <input
                className={radioStyles.state}
                type="radio"
                name="app"
                id="b"
                value="b"
              />
              <label className={radioStyles.label} htmlFor="b">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>0.005 ETH</span>
              </label>
            </div>
            <div className={radioStyles.wrapper}>
              <input
                className={radioStyles.state}
                type="radio"
                name="app"
                id="c"
                value="c"
              />
              <label className={radioStyles.label} htmlFor="c">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>&nbsp;0.01 ETH</span>
              </label>
            </div>
          </div>
          <form action="#">
            <button className={styles.depositButton}>BUY NOW</button>
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
