import React from "react";
import styles from "../../styles/Analysis.module.css";
import HoldingCoinCard from "./HoldingCoin";
import numeral from "numeral";
import { formatUnits } from "ethers";
import getDisplayAmount from "../../utils/getDisplayAmount";

export default function OthersToken({ tokens }) {
  return (
    <div className={`${styles.othersTokenContainer}`}>
      <div className="flex al-ce jc">
        <span className={styles.othersTokenText}>
          OTHERS TOKENS ON THIS ACCOUNT
        </span>
        <div className={styles.border} />
      </div>

      <div className={styles.othersTokenGridContainer}>
        {tokens.map((token, i) => {
          return (
            <HoldingCoinCard
              key={i}
              amount={
                token.tokenInfo.decimals
                  ? getDisplayAmount(token.rawBalance, token.tokenInfo.decimals)
                  : "Pool Position"
              }
              name={token.tokenInfo.name}
            />
          );
        })}
      </div>
    </div>
  );
}
