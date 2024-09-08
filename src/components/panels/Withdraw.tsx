import React, { useState } from "react";
import styles from "../styles/Withdraw.module.scss";
import { BaseError, useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import contractABI from "../../utils/abis/whisper.json"
import contractAddress from "../../utils/contractAddresses.json"
import utils from "../../helpers/utilities";

const contractInterface = new ethers.utils.Interface(contractABI);


const WithdrawCard = () => {
  const account = useAccount()
  const [inputValue, setInputValue] = useState("");
  const { data: hash, error: contractError, isPending, writeContract} = useWriteContract();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const withdraw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!inputValue) {
      alert("Please enter a proof to withdraw");
      return;
    }

    try {
      const proofString = inputValue;
      const proofElements = JSON.parse(atob(proofString));

      const receipt = await window.ethereum.request({
        method: "eth_getTransactionReceipt",
        params: [proofElements.txHash],
      })

      if (!receipt) {
        alert("Wrong Proof");
        return;
      }

      const log = receipt.logs[0]
      
      const decodedData = contractInterface.decodeEventLog("Deposit", log.data, log.topics)

      const SnarkJS: any = (window as any)['snarkjs'];
      
      const proofInput = {
        "root": utils.BigNumberToDecimal(decodedData.root),
        "nullifierHash": proofElements.nullifierHash,
        "recipient": utils.BigNumberToDecimal(account.address),
        "secret": utils.BigNumber256toBinary(proofElements.secret).split(""),
        "nullifier": utils.BigNumber256toBinary(proofElements.nullifier).split(""),
        "hashPairings": decodedData.hashPairings.map((n: any) => (utils.BigNumberToDecimal(n))),
        "hashDirections": decodedData.hashDirections
      }

      const { proof, publicSignals} = await SnarkJS.groth16.fullProve(proofInput, "/withdraw.wasm", "/setup_final.zkey")

      const callInputs = [
        proof.pi_a.slice(0, 2).map(utils.BigNumber256toHex),
        proof.pi_b.slice(0, 2).map((row: any) => (utils.reverseCoordinate(row.map(utils.BigNumber256toHex)))),
        proof.pi_c.slice(0, 2).map(utils.BigNumber256toHex),
        publicSignals.slice(1, 2).map(utils.BigNumber256toHex)
      ]

      console.log(callInputs)

      await writeContract({
        abi: contractABI,
        address: contractAddress.whisper as `0x${string}`,
        functionName: "withdraw",
        args: callInputs,
      })

    } catch (error) {
      console.log(error);
      alert("Either the proof is used/wrong or the transaction failed");
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <div id="page" className={styles.page}>
      <div id="main" className={styles.main}>
        <div className={styles.productContainer}></div>
        <div className={styles.card}>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              required
              value={inputValue}
              onChange={handleInputChange}
            />
            <label htmlFor="user">Proof</label>
            {contractError &&
              <div>
                <p>Error: {(contractError as BaseError).shortMessage || contractError.message}</p>
              </div>
            }
            {
              isConfirmed && (
                <div>
                  <p>Transaction confirmed</p>
                </div>
              )
            }
          </div>
          <form action="#">
            <button className={styles.EchoButton} onClick={withdraw}>
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