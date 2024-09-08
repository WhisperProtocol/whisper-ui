import React, { useState, useEffect } from "react";
import styles from "../styles/Deposit.module.scss";
import radioStyles from "../styles/RadioButtons.module.scss";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, BaseError } from "wagmi";
import abi from "../../utils/abis/whisper.json";
import { parseEther } from "viem";
import { useKyc } from '../../context/KycContext';
import { ethers } from "ethers";
import utilities from "../../helpers/utilities"
import wc from "../../utils/circuit/witness_calculator";
import { getChainConfig } from "../../utils/chainConfig";

const DepositCard = () => {
  const { isKintoKycEnabled } = useKyc();
  const { chain } = useAccount();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [proofElements, updateProofElements] = useState<string | null>(null);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const [nullifier, setNullifier] = useState<string | null>(null);
  const [commitment, setCommitment] = useState<string | null>(null);
  const [nullifierHash, setNullifierHash] = useState<string | null>(null);

  const chainConfig = getChainConfig(chain?.id as number || 17000);

  const symbol = chainConfig?.symbol;

  // Write contract
  const { data: hash, error: contractError, isPending, writeContract } = useWriteContract();

  const handleDeposit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedValue) {
      alert("Please select a value first.");
      return;
    }

    // let depositAmount = "0";
    // if (selectedValue === "a") {
    //   depositAmount = "0.0011";
    // } else if (selectedValue === "b") {
    //   depositAmount = "0.0051";
    // } else if (selectedValue === "c") {
    //   depositAmount = "0.0101";
    // }

    const depositAmount = chainConfig.depositValues[selectedValue];

    const contractAddress = chainConfig.contractAddress;

    const secret = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();
    const nullifier = ethers.BigNumber.from(ethers.utils.randomBytes(32)).toString();

    const input = {
      secret: utilities.BigNumber256toBinary(secret).split(""),
      nullifier: utilities.BigNumber256toBinary(nullifier).split(""),
    };

    var res = await fetch("/deposit.wasm");
    var buffer = await res.arrayBuffer();
    var depositWC = await wc(buffer);

    const r = await depositWC.calculateWitness(input, 0);

    const commitment = r[1];
    const nullifierHash = r[2];

    console.log(commitment)

    try {
      const parsedAmount = parseEther(depositAmount);
      console.log("Parsed Amount:", parsedAmount);

      console.log("Calling writeContract with amount:", depositAmount);
      await writeContract({
        abi,
        address: contractAddress as `0x${string}`,
        functionName: "deposit",
        args: [commitment],
        value: parsedAmount,
      });

        
      setSecret(secret);
      setNullifier(nullifier);
      setCommitment(`${commitment}`);
      setNullifierHash(`${nullifierHash}`)
    } catch (error) {
        console.error(error);
        // setError("Failed to parse deposit amount. Please try again.");
    }
  };

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  if (isConfirmed && !proofElements) {
    const proofElements = {
      nullifierHash: nullifierHash,
      secret: secret,
      nullifier: nullifier,
      commitment: commitment,
      txHash: hash,
    }

    console.log(proofElements);
    updateProofElements(btoa(JSON.stringify(proofElements)));

    // Clear the values after setting the proof
    setSecret(null);
    setNullifier(null);
    setCommitment(null);
    setNullifierHash(null);
  }

  const copyProof = () => {
    if (proofElements) {
      navigator.clipboard.writeText(proofElements);
      alert("Proof copied to clipboard!");
      setShowCopyButton(false); // Hide the copy button after copying
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    setError(null); // Clear error when a value is selected
  };

  // Show copy button only after transaction is confirmed
  useEffect(() => {
    if (isConfirmed && !isTransactionConfirmed) {
      setShowCopyButton(true);
      setIsTransactionConfirmed(true); // Ensure this only runs once
    }
  }, [isConfirmed, isTransactionConfirmed]);

  return (
    <div id="page" className={styles.page}>
      <div id="main" className={styles.main}>
        <div className={styles.productContainer}></div>
        <div className={styles.card}>
          {contractError && (
            <div>
              <p>Error: {(contractError as BaseError).shortMessage || contractError.message}</p>
            </div>
          )}
          {!showCopyButton ? (
            <>
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
                    <span className={radioStyles.text}>{chainConfig.depositValues["a"]} {symbol}</span>
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
                    <span className={radioStyles.text}>{chainConfig.depositValues["b"]} {symbol}</span>
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
                    <span className={radioStyles.text}>&nbsp;{chainConfig.depositValues["c"]} {symbol}</span>
                  </label>
                </div>
              </div>
              <form action="#">
                <button
                  className={`${styles.whisperButton} ${isPending ? styles.loading : ''}`}
                  onClick={handleDeposit}
                  disabled={isPending || !isKintoKycEnabled}
                >
                  {isPending || isConfirming ? <span className={styles.loader}></span> : <span>Whisper In</span>}
                </button>
              </form>
            </>
          ) : (
            <button className={styles.copyButton} onClick={copyProof}>
              Copy Proof
            </button>
          )}
        </div>
        {/* <div className={styles.priceContainer}>
          <strong>149,95 €</strong>
          <small>Inc. shipping & tax</small>
        </div> */}
      </div>
    </div>
  );
};

export default DepositCard;