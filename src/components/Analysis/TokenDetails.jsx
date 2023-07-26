import React from "react";
import styles from "../../styles/Analysis.module.css";

export default function TokenDetails({ leftText, rightSection }) {
  return (
    <div className={styles.tokenDetails}>
      <div className={styles.tokenDetailsTitle}>{leftText}</div>
      <div className={styles.tokenDetailsRightSection}>{rightSection}</div>
    </div>
  );
}
