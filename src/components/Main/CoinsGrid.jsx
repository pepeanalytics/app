import React, { useState } from "react";
import styles from "../../styles/Main.module.css";
import Button from "../Button";
import rightArrow from "../../assets/images/rightArrow.svg";
import uniswapLogo from "../../assets/images/uniswap.png";
import sushiswapLogo from "../../assets/images/sushiswap.png";
import { ArrowLeft } from "../../assets/Svg";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { format as formatTimeago } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenSnifferAddressState } from "../../recoil/search";
import SmartPriceDisplay from "../SmartPriceDisplay";

export default function CoinsGrid() {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const setTokenAddress = useSetRecoilState(tokenSnifferAddressState);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["/dashboard/home"],
  });

  const newTokens = data ? data.newPairs : [];
  const displayTokens = hidden ? newTokens?.slice(0, 5) : newTokens;

  const handleSeeMore = (address) => {
    setTokenAddress(address);
    navigate(`/seemore?address=${address}`);
  };

  return (
    <div className={styles.coinsGrid}>
      <div className={styles.headersGrid}>
        <div>Pair</div>
        {!isMobile ? (
          <>
            <div>Listed Since</div>
            <div>TxCount</div>
            <div>Liquidity/TVL</div>
          </>
        ) : null}
        <div>Price</div>
        <div></div>
      </div>

      <div className={styles.coinsGridContent}>
        {isSuccess ? (
          displayTokens?.map((newPair) => {
            return (
              <div className={styles.valuesGrid} key={newPair.address}>
                <div className={styles.name}>
                  <img
                    src={
                      newPair.protocol === "uniswap"
                        ? uniswapLogo
                        : sushiswapLogo
                    }
                    alt="coin1"
                  />
                  <span>{`${newPair.quoteToken.symbol} / ${newPair.baseToken.symbol}`}</span>
                </div>
                {!isMobile ? (
                  <>
                    <div className={styles.coinGridItem}>
                      {formatTimeago(newPair.createdAt)}
                    </div>
                    <div className={styles.coinGridItem}>
                      {newPair.txCount}
                      {/* ${newPair.usdPrice.substring(0, 6)} */}
                    </div>
                    <div className={styles.coinGridItem}>
                      {newPair?.liquidity?.usd ? (
                        <SmartPriceDisplay price={newPair?.liquidity?.usd} />
                      ) : (
                        parseFloat(newPair?.tvl?.usd).toFixed(5)
                      )}
                      {/* {token.holdersCount} */}
                    </div>
                  </>
                ) : null}
                <div className={styles.price}>
                  $<SmartPriceDisplay price={newPair.priceUSD} />
                </div>
                <div
                  className={styles.seeMore}
                  onClick={() => {
                    handleSeeMore(newPair.quoteToken.address);
                  }}
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

        {hidden ? <div className={styles.blur}></div> : null}

        {newTokens?.length > 5 ? (
          <div
            className={`${styles.center} ${
              hidden ? styles.seeFullListButton : styles.hideBtn
            }`}
          >
            <Button
              variant="primary"
              onClick={() => {
                setHidden((prev) => !prev);
              }}
            >
              <span className={styles.seeFullList}>
                {hidden ? "see full list" : "hide full list"}
                <ArrowLeft />
              </span>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
