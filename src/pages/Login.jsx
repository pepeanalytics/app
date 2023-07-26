import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import styles from "../styles/Login.module.css";
import Button from "../components/Button";
import { ArrowLeft } from "../assets/Svg";

import { useAccount } from "wagmi";

export default function Login({ buttonText, handleClick }) {
  const { isConnected } = useAccount();

  const soldOut = true;
  return (
    <>
      <div className={styles.bg}></div>
      <HomeHeader />
      <MobNavbar />
      <div className={styles.login}>
        <div className={`hello ${soldOut ? "sold-out" : ""}`}>
          hello gambler!
        </div>
        <div className="reserve">
          {isConnected ? "Login with Wallet" : "Connect Wallet"}{" "}
        </div>
        <div className={styles.subText}>
          {isConnected
            ? "sign the message by clicking below and login to the dashboard."
            : "connect your wallet to then sign the message and login to the dashboard."}
        </div>
        <div className="flex row al-ce mint-btn-wrapper">
          <Button variant="primary" onClick={handleClick}>
            <span className={styles.loginBtn}>
              {buttonText}
              <ArrowLeft />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
