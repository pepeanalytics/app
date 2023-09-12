import React from "react";
import styles from "../styles/Verify.module.css";
import Button from "./Button";
import { ArrowLeft } from "../assets/Svg";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

export default function VerfiyComponent({ verifyAction }) {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();

  const handleConnectWallet = () => {
    open();
  };
  const handleClick = () => {
    if (!address || isConnecting || isDisconnected) {
      handleConnectWallet();
    } else {
      verifyAction(false);
    }
  };
  return (
    <>
      <div className={`flex col al-ce ${styles.verifyWrapper}`}>
        <div className={styles.header}>Please verify your wallet</div>
        <div className={styles.verify}>
          <Button variant="primary" onClick={handleClick}>
            <span className={styles.verifyBtn}>
              Verify
              <ArrowLeft />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
