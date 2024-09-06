import React, { useState } from "react";
import styles from "../styles/Deposit.module.scss";
import radioStyles from "../styles/RadioButtons.module.scss";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import abi from "../../utils/poolEthAbi.json";
import contractAddress from "../../utils/contractAddresses.json";
import { parseEther } from "viem";

const DepositCard = () => {
  // const account = useAccount();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Write contract
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleDeposit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedValue) {
      alert("Please select a value first.");
      return;
    }

    let depositAmount = "0";
    if (selectedValue === "a") {
      depositAmount = "1.0001";
    } else if (selectedValue === "b") {
      depositAmount = "0.0051";
    } else if (selectedValue === "c") {
      depositAmount = "0.0101";
    }

    try {
      const parsedAmount = parseEther(depositAmount);
      console.log("Parsed Amount:", parsedAmount);

      console.log("Calling writeContract with amount:", depositAmount);
      await writeContract({
        abi,
        address: `${contractAddress.poolETH2}` as `0x${string}`,
        functionName: "Deposit",
        value: parsedAmount,
      });

      console.log("Transaction Hash:", hash);
    } catch (error) {
      console.error("Error parsing deposit amount:", error);
      setError("Failed to parse deposit amount. Please try again.");
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    setError(null); // Clear error when a value is selected
  };

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
                onChange={handleRadioChange}
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
                onChange={handleRadioChange}
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
                onChange={handleRadioChange}
              />
              <label className={radioStyles.label} htmlFor="c">
                <div className={radioStyles.indicator}></div>
                <span className={radioStyles.text}>&nbsp;0.01 ETH</span>
              </label>
            </div>
          </div>
          <form action="#">
            <button
              className={`${styles.whisperButton} ${isPending ? styles.loading : ''}`}
              onClick={handleDeposit}
              disabled={isPending}
            >
              {isPending ? <span className={styles.loader}></span> : <span>Whisper In</span>}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
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