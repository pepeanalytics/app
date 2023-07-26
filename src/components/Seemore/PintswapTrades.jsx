import React, { useState } from "react";
import pageStyles from "../../styles/HoldersInfo.module.css";

import styles from "../../styles/Analysis.module.css";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Copy } from "../../assets/Svg";
import UniversalLoader from "../UniversalLoader";
import Button from "../Button";
import numeral from "numeral";
import { shortenWalletAddress } from "../../utils/shortenWallet";
import { HideBtn } from "../../pages/SeeMore";
import { useMediaQuery } from "react-responsive";

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
};

export default function PintswapTrades({ address }) {
  const [hidden, setHidden] = useState(true);
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [`/pintswap/txs`],
  });

  return (
    <>
      {isError && (
        <div className={styles.error}>
          An error occurred while completing this request
        </div>
      )}
      {isLoading && <UniversalLoader />}
      {isSuccess && (
        <>
          <div className={`${styles.section}`}>
            <div
              className={`${pageStyles.dataDisplay} ${
                hidden ? styles.holdingHidden : ""
              }`}
            >
              {data?.length === 0 ? <div>No pintswap trades</div> : <Headers />}
              {data.map((trade) => (
                <Row
                  key={trade?.id}
                  id={trade?.id}
                  maker={trade?.maker}
                  taker={trade?.taker}
                  makerGets={trade?.gets?.amount}
                  takerGets={trade?.gives?.amount}
                  getSymbol={trade?.gets?.token}
                  giveSymbol={trade?.gives?.token}
                />
              ))}
            </div>
            {data?.length > 5 && (
              <HideBtn hidden={hidden} setHidden={setHidden} />
            )}
          </div>
        </>
      )}
    </>
  );
}

const Headers = () => {
  return (
    <div className={`${pageStyles.headers} ${pageStyles.pintSwapHeaders}`}>
      <div className={pageStyles.headerTexts}>Maker</div>
      <div className={pageStyles.headerTexts}>Taker</div>
      <div className={pageStyles.headerTexts}>Maker Gets</div>
      <div className={pageStyles.headerTexts}>Taker Gets</div>
      <div />
    </div>
  );
};

const Row = ({
  id,
  maker,
  taker,
  makerGets,
  takerGets,
  getSymbol,
  giveSymbol,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <div className={`${pageStyles.row} ${pageStyles.pintSwapRow}`}>
      <div className={pageStyles.rowItem}>
        {shortenWalletAddress(maker)}

        <span onClick={() => handleCopy(maker)} className={pageStyles.copy}>
          <Copy />
        </span>
      </div>
      <div className={pageStyles.rowItem}>
        {shortenWalletAddress(taker)}
        <span onClick={() => handleCopy(taker)} className={pageStyles.copy}>
          <Copy />
        </span>
      </div>
      <div className={pageStyles.rowItem}>
        {numeral(makerGets).format("0.0a")} {getSymbol}
      </div>
      <div className={pageStyles.rowItem}>
        {numeral(takerGets).format("0.0a")} {giveSymbol}
      </div>
      <div
        className={pageStyles.rowItem}
        onClick={() => window.open(`https://etherscan.io/tx/${id}`, "_blank")}
      >
        {isMobile ? null : "tx hash"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14.539"
          height="11.896"
          viewBox="0 0 14.539 11.896"
        >
          <path
            tokenAddress="Path_656"
            data-name="Path 656"
            d="M7.931,0V3.966H0V7.931H7.931V11.9H9.252V10.574h1.322V9.253H11.9V7.931h1.322V6.609h1.322V5.287H13.218V3.966H11.9V2.644H10.574V1.322H9.252V0Z"
            transform="translate(0 0)"
            fill="#e1007f"
          />
        </svg>
      </div>
    </div>
  );
};
