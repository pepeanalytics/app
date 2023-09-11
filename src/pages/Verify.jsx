import React, { useState } from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import VerfiyComponent from "../components/VerfiyComponent";
import Copy from "../components/Copy";
import styles from "../styles/Verify.module.css";

export default function Verify() {
  const [verifySectionVisible, setVerifySectionVisible] = useState(true);

  return (
    <>
      <div className={styles.bg} />
      <HomeHeader />
      <MobNavbar />
      {verifySectionVisible ? (
        <VerfiyComponent setVerifySectionVisible={setVerifySectionVisible} />
      ) : (
        <Copy />
      )}
    </>
  );
}
