import React from "react";
import styles from "../../styles/Analysis.module.css";

export default function HolderTypes({
  color,
  name,
  percent = "",
  amount = "",
}) {
  return (
    <div className={styles.holderType}>
      <div className={`flex al-ce`}>
        <div
          className={styles.holderTypeColor}
          style={{ backgroundColor: color }}
        />
        <div className={styles.holderTypeName}>{name}</div>
      </div>
      <div className={styles.holderTypePercent}>
        {percent ? `${percent}%` : amount}
      </div>
    </div>
  );
}
