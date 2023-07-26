import React from "react";
import styles from "../../styles/Analysis.module.css";
import pinkCircle from "../../assets/images/smallPinkCircle.png";
import { Arrow, BuyIcon, LinkIcon, SellIcon } from "../../assets/Svg";
import { useMediaQuery } from "react-responsive";
import Accordion from "../AccordionSection";
import getDisplayAmount from "../../utils/getDisplayAmount";

export default function History({ time, history, address }) {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  return (
    <div className={styles.historyContainer}>
      <div className="flex al-ce jc">
        <span className={styles.othersTokenText}>LAST APES HISTORY</span>
        <span className={styles.time}>{time}</span>
        <div className={styles.border} />
      </div>

      {!isMobile && <HistoryHeadersGrid />}
      {history.map((item, i) => (
        <HistoryRow
          key={i}
          type={item.to === address ? "buy" : "sell"}
          coinName={item.tokenInfo.name}
          amount={getDisplayAmount(item.value, item.tokenInfo.decimals)}
          hash={item.transactionHash}
          time={new Date(item.timestamp).toLocaleString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        />
      ))}
    </div>
  );
}

const HistoryHeadersGrid = () => {
  return (
    <div className={styles.historyHeadersGridContainer}>
      <div>type</div>
      <div>coin name</div>
      <div>amount</div>
      <div>time</div>
      <div />
    </div>
  );
};

const HistoryRow = ({ type, coinName, amount, time, logoUrl, hash, link }) => {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  return (
    <div
      className={`${styles.historyRowContainer} ${
        type === "buy" ? styles.buy : styles.sell
      }`}
    >
      {!isMobile && (
        <div className={type === "buy" ? styles.buyType : styles.sellType}>
          {type === "buy" ? <BuyIcon /> : <SellIcon />}
          {type}
        </div>
      )}
      <Accordion
        openClass={styles.historyRowMobileOpen}
        title={
          <div className={styles.subAccordionHeader}>
            <div className={`${styles.coinNameContainer} flex al-ce`}>
              {isMobile ? type === "buy" ? <BuyIcon /> : <SellIcon /> : null}
              <img src={logoUrl || pinkCircle} alt="coin-logo" />
              <span>{coinName}</span>
            </div>
            {isMobile && (
              <div className={`flex al-ce jc ${styles.headerArrowContainer}`}>
                <Arrow />
              </div>
            )}
          </div>
        }
      >
        {isMobile && (
          <div className={styles.mobileContent}>
            <div className={styles.twoGrid}>
              <div>
                <div className={styles.mobileHeader}>Amount</div>
                <div className={styles.value}>{amount}</div>
              </div>
              <div>
                <div className={styles.mobileHeader}>Time</div>
                <div className={styles.value}>{time}</div>
              </div>
            </div>
            <div className="center">
              <div
                className={`${styles.seeTx} flex al-ce jc`}
                onClick={() => {
                  window.open(`https://etherscan.io/tx/${hash}`, "_blank");
                }}
              >
                see tx
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.612"
                  height="11.137"
                  viewBox="0 0 13.612 11.137"
                >
                  <path
                    id="Path_71"
                    data-name="Path 71"
                    d="M7.425,0V3.712H0V7.425H7.425v3.712H8.662V9.9H9.9V8.662h1.237V7.425h1.237V6.187h1.237V4.95H12.375V3.712H11.137V2.475H9.9V1.237H8.662V0Z"
                    fill="#c67ba6"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Accordion>
      {!isMobile && (
        <>
          <div>{amount}</div>
          <div>{time}</div>
        </>
      )}
      {!isMobile ? (
        <div
          className={`${styles.linkContainer} flex al-ce jc`}
          onClick={() => {
            window.open(`https://etherscan.io/tx/${hash}`, "_blank");
          }}
        >
          TX
          <LinkIcon />
        </div>
      ) : null}
    </div>
  );
};
