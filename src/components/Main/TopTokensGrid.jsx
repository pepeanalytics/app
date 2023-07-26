import React, { useState } from "react";
import errorStyle from "../../styles/Analysis.module.css";
import styles from "../../styles/Main.module.css";
import Button from "../Button";
import rightArrow from "../../assets/images/rightArrow.svg";
import { ArrowLeft } from "../../assets/Svg";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { format as formatTimeago } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenSnifferAddressState } from "../../recoil/search";
import uniswapLogo from "../../assets/images/uniswap.png";
import SmartPriceDisplay from "../SmartPriceDisplay";
import UniversalLoader from "../UniversalLoader";
import numeral from "numeral";
import formatBigNumber from "../../utils/formatBigNumber";

export default function TopTokensGrid() {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const setTokenAddress = useSetRecoilState(tokenSnifferAddressState);

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["/tokens/top"],
  });

  if (isError)
    return (
      <div className={errorStyle.error}>
        An error occured while completeing this request.
      </div>
    );

  const topTokens = data ? data.slice(0, 10) : [];

  const handleSeeMore = (address) => {
    setTokenAddress(address);
    navigate(`/token-sniffer?address=${address}`);
  };

  const imgSrc = (imgLink) => {
    if (!imgLink || imgLink == "N/A") return uniswapLogo;
    return `https://ethplorer.io/${imgLink}`;
  };

  return (
    <div className={`${styles.coinsGrid} ${styles.topGrid}`}>
      <div className={styles.headersGrid}>
        <div>Coin name</div>
        {!isMobile ? (
          <>
            <div>Txs Count</div>
            <div>holders count</div>
          </>
        ) : null}
        <div>price</div>
        <div></div>
      </div>
      {isLoading && <UniversalLoader />}
      <div className={styles.coinsGridContent}>
        {isSuccess ? (
          topTokens?.map((token) => {
            return (
              <div className={styles.valuesGrid} key={token.address}>
                <div className={styles.name}>
                  {imgSrc() && (
                    <img
                      className={styles.img}
                      src={imgSrc(token.image)}
                      alt="link"
                    />
                  )}

                  <span>{token.name}</span>
                </div>
                {!isMobile ? (
                  <>
                    <div className={styles.coinGridItem}>
                      {formatBigNumber(token?.txsCount)}
                    </div>
                    <div className={styles.coinGridItem}>
                      {formatBigNumber(token?.holdersCount)}
                    </div>
                  </>
                ) : null}
                <div className={styles.price}>
                  $
                  <SmartPriceDisplay price={String(token.price?.rate || "0")} />
                </div>
                <div
                  className={styles.seeMore}
                  onClick={() => handleSeeMore(token.address)}
                >
                  {!isMobile ? (
                    "see more"
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7.959"
                      height="13.84"
                      viewBox="0 0 7.959 13.84"
                    >
                      <path
                        id="Path_637"
                        data-name="Path 637"
                        d="M7.655.3a1.04,1.04,0,0,1,0,1.47L2.509,6.92l5.146,5.146a1.039,1.039,0,1,1-1.47,1.47L.3,7.655a1.04,1.04,0,0,1,0-1.47L6.185.3a1.04,1.04,0,0,1,1.47,0Z"
                        transform="translate(0 0)"
                        fill="#fff"
                      />
                    </svg>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
