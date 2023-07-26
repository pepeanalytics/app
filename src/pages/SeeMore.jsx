import React, { useEffect, useMemo, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import Back from "../components/Back";
import pageStyles from "../styles/HoldersInfo.module.css";
import SectionDisplay from "../components/Main/SectionDisplay";
import {
  Arrow,
  ArrowLeft,
  Buy,
  BuyIcon,
  Copy,
  Info,
  SellIcon,
  TargetIcon,
} from "../assets/Svg";
import { format as formatTimeago } from "timeago.js";
import UniversalLoader from "../components/UniversalLoader";
import Button from "../components/Button";
import styles from "../styles/Analysis.module.css";
import mainStyles from "../styles/Main.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useSearchParams } from "react-router-dom";
import SmartPriceDisplay from "../components/SmartPriceDisplay";
import numeral from "numeral";
import { useQuery } from "@tanstack/react-query";
import PintswapTrades from "../components/Seemore/PintswapTrades";
import { shortenWalletAddress } from "../utils/shortenWallet";
import createTradeLink from "../utils/createTradeLink";
import formatBigNumber from "../utils/formatBigNumber";

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
};

export default function SeeMore() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Set the initial active index
  const [queryParams] = useSearchParams();
  const addressQuery = queryParams.get("address");

  const isLargeScreen = useMediaQuery({ query: "(min-width: 769px)" });

  const [currentAddress, setCurrentAddress] = useState(addressQuery);
  const [poolLoading, setPoolLoading] = useState(false);

  const {
    data: tokenData,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`/dashboard/token/${currentAddress}`],
  });

  useEffect(() => {
    if (addressQuery) {
      setCurrentAddress(addressQuery);
    }
  }, [addressQuery]);

  const handleCoinTypeClick = (index) => {
    setActiveIndex(index);
  };

  const handleBuyOnUniswap = () => {
    const tradeLink = createTradeLink("WETH", tokenData?.symbol, "uniswap");
    window.open(tradeLink, "_blank");
  };

  const tokenAddress = tokenData?.address;

  let poolTxsData = {};

  for (let pool of tokenData?.analysis?.pools?.list || []) {
    poolTxsData[pool?.base?.symbol] = [
      ...(poolTxsData?.[pool.base.symbol] || []),
      ...pool.txs,
    ];
  }

  const ativePoolTxs = poolTxsData[Object.keys(poolTxsData)[activeIndex]];

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={`${pageStyles.bodyContainer} ${pageStyles.pepeCoinPage}`}>
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/main"} text="Home" />
        </div>

        {isLargeScreen ? (
          <div className={`flex jc-fe al-ce ${pageStyles.tabButton}`}>
            <span className={pageStyles.infoIcon}>{/* <Info /> */}</span>
            {/* Click tab button to see all transactions history */}
          </div>
        ) : null}
        {isLoading && <UniversalLoader />}
        {isError && (
          <div className={styles.error}>
            An error occurred while completing this request
          </div>
        )}
        {isSuccess && (
          <>
            <div className={`flex sb al-ce ${pageStyles.pepeAction}`}>
              <div>
                <div title={tokenData?.name || ""} className={pageStyles.title}>
                  {tokenData?.name || ""}
                </div>
                <div className={pageStyles.coinId}>
                  <p title={tokenAddress}>{tokenAddress}</p>
                  <span
                    onClick={() => handleCopy(tokenAddress)}
                    className={pageStyles.copy}
                  >
                    <Copy />
                  </span>
                </div>
              </div>
              <div className={`flex al-ce ${pageStyles.sectionBtns}`}>
                <SectionDisplay
                  onClick={() => {
                    // open in new tab
                    window.open(
                      `https://t.me/unibotsniper_bot?start=pepeanalytics-0xd210742b49f559dfc9f7534e2a93c01c3ba6e85f`,
                      "_blank"
                    );
                  }}
                  title={
                    <div
                      className={`flex al-ce jc ${pageStyles.sectionDisplayBtn}`}
                    >
                      <TargetIcon />
                      Snipe with unibot
                    </div>
                  }
                  hideArrow
                />
                {/* <SectionDisplay
                  onClick={handleBuyOnUniswap}
                  title={
                    <div
                      className={`flex al-ce jc ${pageStyles.sectionDisplayBtn}`}
                    >
                      <Buy /> Buy on Uniswap
                    </div>
                  }
                  hideArrow
                /> */}
              </div>
            </div>
            <div className={`flex al-ce ${pageStyles.infoWrapper}`}>
              <div className={pageStyles.info}>
                <div className={pageStyles.infoTitle}>Launched at</div>
                <div className={pageStyles.infoValue}>
                  {formatTimeago(tokenData?.createdAt)}
                </div>
              </div>
              <div className={pageStyles.info}>
                <div className={pageStyles.infoTitle}>Price</div>
                <div
                  className={`${pageStyles.infoValue} ${pageStyles.priceValue}`}
                >
                  <SmartPriceDisplay price={tokenData?.price?.usd || "0"} />$
                </div>
              </div>
            </div>
            {isLargeScreen ? (
              <div className={pageStyles.border} />
            ) : (
              <div className={pageStyles.seeTransactionsHistory}>
                see transactions history
              </div>
            )}
            <div>
              <div className={pageStyles.headerText}>Pools</div>
              <div className={pageStyles.pools}>
                <div className={pageStyles.active}>
                  <div className={`flex al-ce ${pageStyles.poolTitle}`}>
                    ${numeral(tokenData?.volume?.usd).format("0.0a")}
                  </div>
                  <div className={`flex al-ce ${pageStyles.poolSubtitle}`}>
                    dollar amount of volume done
                  </div>
                </div>
                <div>
                  <div className={`flex al-ce ${pageStyles.poolTitle}`}>
                    $
                    {tokenData?.liquidity
                      ? numeral(tokenData?.liquidity?.usd).format("0.0a")
                      : numeral(tokenData?.tvl?.usd).format("0.0a")}
                  </div>
                  <div className={`flex al-ce ${pageStyles.poolSubtitle}`}>
                    {tokenData?.liquidity ? "Liquidity" : "TVL"}
                  </div>
                </div>
                <div>
                  <div className={`flex al-ce ${pageStyles.poolTitle}`}>
                    {formatBigNumber(tokenData?.txCount)}
                  </div>
                  <div className={`flex al-ce ${pageStyles.poolSubtitle}`}>
                    transaction count
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={pageStyles.header}>Pool transactions</div>
              <CoinTypesComponent
                poolTypes={Object.keys(poolTxsData)?.map(
                  (base) => `${tokenData?.symbol}/${base}`
                )}
                activeIndex={activeIndex}
                handleCoinTypeClick={handleCoinTypeClick}
              />
              {isLoading ? (
                <UniversalLoader />
              ) : (
                <>
                  <div className={`${styles.section}`}>
                    <div
                      className={`${pageStyles.dataDisplay} ${
                        hidden ? null : ""
                      }`}
                    >
                      {ativePoolTxs?.length === 0 ? (
                        <div>No pool transactions</div>
                      ) : (
                        <PoolTransactionsHeader />
                      )}
                      {poolLoading && <UniversalLoader />}
                      {ativePoolTxs
                        ?.slice(0, hidden ? 5 : ativePoolTxs?.length)
                        ?.map((tx, i) => (
                          <PoolTransactionsRow
                            key={i}
                            symbol={tokenData?.symbol}
                            isLargeScreen={isLargeScreen}
                            address={tx?.address}
                            amt={tx?.amount}
                            type={tx?.type}
                            date={tx?.timestamp}
                            hash={tx?.hash}
                          />
                        ))}
                    </div>
                    {ativePoolTxs?.length > 5 && (
                      <HideBtn hidden={hidden} setHidden={setHidden} />
                    )}
                  </div>
                </>
              )}
            </div>

            {/* <div className={pageStyles.header}>Social Mentions</div>
                <div className={pageStyles.socialMentions}>278</div> */}

            {/* <div className={pageStyles.todaysTelegramMentions}>
                  Today's telegram mentions
                </div> */}

            <div className={pageStyles.header}>All pintswap trades</div>
            <PintswapTrades address={currentAddress} />
          </>
        )}
      </div>
    </>
  );
}

const CoinTypesComponent = ({
  poolTypes,
  activeIndex,
  handleCoinTypeClick,
}) => {
  return (
    <div className={pageStyles.poolTypes}>
      {poolTypes?.map((poolType, index) => (
        <div
          key={index}
          className={`${pageStyles.poolType} ${
            index === activeIndex ? pageStyles.active : ""
          }`}
          onClick={() => handleCoinTypeClick(index)}
        >
          {poolType}
        </div>
      ))}
    </div>
  );
};

const PoolTransactionsHeader = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className={`${pageStyles.headers} ${pageStyles.poolHeader}`}>
      <div className={pageStyles.headerTexts}>Date</div>
      {isMobile ? null : <div className={pageStyles.headerTexts}>Type</div>}
      <div className={pageStyles.headerTexts}>Address</div>
      <div className={pageStyles.headerTexts}>Amount</div>
      <div />
    </div>
  );
};

const PoolTransactionsRow = ({
  date,
  symbol,
  type = "sell",
  address,
  amt,
  hash,
  isLargeScreen,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className={`${pageStyles.row} ${pageStyles.poolRow}`}>
      <div className={`${pageStyles.rowItem} ${pageStyles.ago}`}>
        {isMobile ? type === "buy" ? <BuyIcon /> : <SellIcon /> : null}
        {isLargeScreen ? date : formatTimeago(date)}
      </div>
      {isMobile ? null : (
        <div className={pageStyles.rowItem}>
          <div className={type === "buy" ? styles.buyType : styles.sellType}>
            {type === "buy" ? <BuyIcon /> : <SellIcon />}
            {isLargeScreen && type}
          </div>
        </div>
      )}
      <div className={pageStyles.rowItem}>
        {shortenWalletAddress(address)}
        <span onClick={() => handleCopy(address)} className={pageStyles.copy}>
          <Copy />
        </span>
      </div>
      <div className={pageStyles.rowItem}>
        {amt < 1000 ? (
          <SmartPriceDisplay price={amt} />
        ) : (
          numeral(amt).format("0.00a")
        )}{" "}
        {symbol}
      </div>
      <div
        className={pageStyles.rowItem}
        onClick={() => window.open(`https://etherscan.io/tx/${hash}`, "_blank")}
      >
        {isLargeScreen && "Ethscan"}
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

export const HideBtn = ({ hidden, setHidden }) => {
  return (
    <>
      {hidden ? <div className={styles.blur}></div> : null}

      <div
        className={`${mainStyles.center} ${
          hidden ? mainStyles.seeFullListButton : mainStyles.hideBtn
        }`}
      >
        <Button
          variant="primary"
          onClick={() => {
            setHidden((prev) => !prev);
          }}
        >
          <span className={mainStyles.seeFullList}>
            {hidden ? "see full list" : "hide full list"}
            <ArrowLeft />
          </span>
        </Button>
      </div>
    </>
  );
};
