import React from "react";
import styles from "../styles/Verify.module.css";
import Button from "./Button";
import { ArrowLeft } from "../assets/Svg";

export default function VerfiyComponent({ setVerifySectionVisible }) {
  const handleClick = () => setVerifySectionVisible(false);
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
