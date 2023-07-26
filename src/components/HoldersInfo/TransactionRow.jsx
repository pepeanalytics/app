import React from "react";

import styles from "../../styles/HoldersTransactions.module.css";
import addThousandSpaces from "../../utils/addThousandSpaces";
import { useMediaQuery } from "react-responsive";
import { shortenWalletAddress } from "../../utils/shortenWallet";

export default function TransactionRow({ serial, address, amount, pnl }) {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  return (
    <div className={styles.transactionsGrid}>
      <div>{serial}</div>
      <div className={styles.addressText}>
        {isMobile ? shortenWalletAddress(address) : address}
      </div>
      <div className={styles.amountText}>{addThousandSpaces(amount)}</div>
      {isNaN(pnl) ? (
        <div className={styles.amountText}>{"N/A"}</div>
      ) : (
        <div className={`${pnl < 0 ? styles.lossText : styles.profitText}`}>
          {pnl < 0 ? "-" : "+"}
          {Math.abs(pnl)}%
        </div>
      )}
    </div>
  );
}
