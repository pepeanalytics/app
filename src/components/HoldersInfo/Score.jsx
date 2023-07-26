import React from "react";

import styles from "../../styles/HoldersInfo.module.css";
import scoreBg from "../../assets/images/scoreBg.png";

export default function Score({ score }) {
  const getStyles = () => {
    if (score?.toString()?.length > 1)
      return {
        fontSize: "1.5rem",
      };
    else {
      return {
        fontSize: "2.5rem",
      };
    }
  };
  return (
    <div className={`flex col al-en sa ${styles.scoreRow}`}>
      <div className={styles.scoreText}>score</div>
      <div className={`${styles.scoreCircle} flex col jc al-ce`}>
        <img src={scoreBg} alt="link" />
        <div className={styles.scoreNumber} style={getStyles()}>
          {score}
        </div>
        <div className={styles.outOf}>/100</div>
      </div>
    </div>
  );
}
