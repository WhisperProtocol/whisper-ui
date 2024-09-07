'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles/Navbar.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import { createPublicClient, defineChain, getContract, http } from 'viem';
import kycABI from "../utils/abis/kycAbi.json";
import poolAbi from "../utils/abis/poolEthAbi.json"
import { useAccount, useReadContract } from 'wagmi';
import contractAddreses from '../utils/contractAddresses.json'
import { hardhat } from 'viem/chains';
import { useKyc } from '../context/KycContext';

// Define the Kinto chain
const kinto = defineChain({
  id: 7887,
  name: 'Kinto',
  network: 'kinto',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.kinto-rpc.com/'],
      webSocket: ['wss://rpc.kinto.xyz/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://kintoscan.io' },
  },
});

const Navbar = () => {
  const { isKintoKycEnabled, setIsKintoKycEnabled } = useKyc();
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(undefined);
  const kintoSDK = createKintoSDK('0x0E6F513B2DfE36A3d922Db804f3568669679d911');
  const account = useAccount();

  const kintoLogin = useCallback(async () => {
    try {
      await kintoSDK.createNewWallet();
      fetchAccountInfo();
    } catch (error) {
      console.error('Failed to login/signup:', error);
    }
  }, [kintoSDK]);

  const fetchAccountInfo = useCallback(async () => {
    try {
      const info = await kintoSDK.connect();
      setAccountInfo(info);
    } catch (error) {
      console.error('Failed to fetch account info:', error);
    }
  }, [kintoSDK]);

  const fetchKycInfo = useCallback(async () => {
    if (!accountInfo?.walletAddress) return;

    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });

    const kycViewer = getContract({
      address: '0xB21B5A03fd7510E388C883b27D0D4d138a2034E1',
      abi: kycABI,
      client: { public: client },
    });

    try {
      const [isKYC] = await Promise.all([
        kycViewer.read.isKYC([accountInfo.walletAddress]),
      ]);

      setIsKintoKycEnabled(isKYC as boolean);
    } catch (error) {
      console.error('Failed to fetch KYC info:', error);
    }
  }, [accountInfo, setIsKintoKycEnabled]);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  useEffect(() => {
    if (accountInfo?.walletAddress) {
      fetchKycInfo();
    }
  }, [accountInfo, fetchKycInfo]);

  useEffect(() => {
    const handleFocus = () => {
      if (accountInfo?.walletAddress) {
        fetchKycInfo();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [accountInfo, fetchKycInfo]);

  const handleKycToggle = () => {
    setIsKintoKycEnabled(!isKintoKycEnabled);
  };

  return (
    <nav className={`${styles.nav} ${isKintoKycEnabled ? styles.kycEnabled : ''}`}>
      <img src="./logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <label className={styles.kycToggle}>
          <input 
            type="checkbox" 
            checked={isKintoKycEnabled} 
            onChange={handleKycToggle} 
          />
          KYC Enabled
        </label>
        <button 
          className={`${styles.getKintoButton} ${isKintoKycEnabled ? styles.kycButtonDisabled : ''}`} 
          onClick={kintoLogin}
        >
          Get Kinto ID
        </button>
        {isKintoKycEnabled && <span className={styles.kycButtonEnabled}>KYC Verified</span>}
        <ConnectButton chainStatus='icon'/>
      </div>
    </nav>
  );
};

export default Navbar;