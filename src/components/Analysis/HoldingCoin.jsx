import React from "react";
import styles from "../../styles/Analysis.module.css";
import pinkCircle from "../../assets/images/smallPinkCircle.png";

export default function HoldingCoinCard({ logoUrl, name, amount }) {
  return (
    <div className={styles.holdingCoinCard}>
      <img src={logoUrl || pinkCircle} alt="coin-logo" />
      <div className="flex col al-st jc">
        <div className={styles.coinName}>{name}</div>
        <div className={`text-ellipsis ${styles.coinAmount}`}>{amount}</div>
      </div>
    </div>
  );
}
