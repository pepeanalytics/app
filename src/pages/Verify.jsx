import React, { useState } from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import VerfiyComponent from "../components/VerfiyComponent";
import Copy from "../components/Copy";
import styles from "../styles/Verify.module.css";
import { useParams } from "react-router-dom";
import { useAccount, useWalletClient } from "wagmi";

export default function Verify() {
  const [signedMessage, setSignedMessage] = useState("");
  let { code } = useParams();

  const { isConnected, address } = useAccount();
  const { data: signer } = useWalletClient();

  const verifyActionHandler = async () => {
    if (!signer || !isConnected || !address) return;
    const message = code;
    try {
      const signature = await signer.signMessage({
        account: address,
        message: message,
      });
      setSignedMessage(signature);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.bg} />
      <HomeHeader />
      <MobNavbar />
      {signedMessage == "" ? (
        <VerfiyComponent verifyAction={verifyActionHandler} />
      ) : (
        <Copy signedMessage={signedMessage} />
      )}
    </>
  );
}
