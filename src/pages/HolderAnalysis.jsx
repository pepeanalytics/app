import React, { useState } from "react";
import styles from "../styles/Analysis.module.css";
import mainStyles from "../styles/Main.module.css";
import Button, { RoundButton } from "../components/Button";
import { ArrowLeft, Pacman } from "../assets/Svg";
import HolderTypes from "../components/Analysis/HolderTypes";
import TokenDetails from "../components/Analysis/TokenDetails";
import AnalysisSplineGraph from "../components/Analysis/SplineGraph";
import PieChart from "../components/Analysis/PieChart";
import Accordion, {
  AccordionContentHeader,
  AccordionHeader,
} from "../components/AccordionSection";
import OthersToken from "../components/Analysis/OthersToken";
import History from "../components/Analysis/History";
import { useMediaQuery } from "react-responsive";
import numeral from "numeral";
import TopHolderItem from "../components/Analysis/TopHolderItem";
import RangeSlider from "../components/Slider";
import getDisplayAmount from "../utils/getDisplayAmount";
import getTimeDiff from "../utils/getTimeDiff";
import formatBigNumber from "../utils/formatBigNumber";

const Labels = ["Locked", "Unlocked", "Burned", "Owner"];
// const ChartData = [90, 5, 3, 2];
const Colors = ["#E1007F", "#49B7AB", "#EE5018", "#FFFFFF"];

export default function HolderAnalysis({ tokenData }) {
  const [hidden, setHidden] = useState(true);
  const [walletsSectionHidden, setWalletsSectionHidden] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (!tokenData) return null;

  const displayData = hidden
    ? tokenData?.analysis?.holders?.top.slice(0, 5)
    : tokenData?.analysis?.holders?.top;

  const firstBoughData = walletsSectionHidden
    ? tokenData?.firstTxs.slice(0, 5)
    : tokenData?.firstTxs;

  // Get data for the pie chart from tokenData
  const ChartData = [
    parseInt(tokenData?.analysis?.balances?.locked?.share),
    parseInt(tokenData?.analysis?.balances?.unlocked?.share),
    parseInt(tokenData?.analysis?.balances?.burned?.share),
    parseInt(tokenData?.analysis?.balances?.owner?.share),
  ];
  const AmountData = [
    String(tokenData?.analysis?.balances?.locked?.amount),
    String(tokenData?.analysis?.balances?.unlocked?.amount),
    String(tokenData?.analysis?.balances?.burned?.amount),
    String(tokenData?.analysis?.balances?.owner?.amount),
  ];

  // console.log(tokenData?.analysis?.holders)
  return (
    <>
      {/* <div className={`${styles.header} ${styles.holderHeader}`}>
        holders in time
        <Pacman />
      </div>
      <div className={`flex jc-fe al-ce`}>
        <RoundButton>1</RoundButton>
      </div>
      <AnalysisSplineGraph /> */}
      <div className={`${styles.header} ${styles.holderHeader}`}>
        <div>
          Top 30 holders
          <Pacman />
        </div>
      </div>
      <div className={styles.holderSection}>
        <div className={styles.dataGrid}>
          <PieChart labels={Labels} data={ChartData} colors={Colors} />
          <div>
            {Labels.map((label, index) => (
              <HolderTypes
                key={index}
                name={label}
                amount={numeral(
                  AmountData[index]?.substring(
                    0,
                    // @todo check this apptoach
                    AmountData[index]?.length - tokenData.decimals
                  )
                ).format("0a")}
                color={Colors[index]}
              />
            ))}
          </div>
          <div>
            <TokenDetails
              leftText={"Total Holders"}
              rightSection={tokenData?.analysis?.holders?.count}
            />
            <TokenDetails
              leftText={"Total Supply"}
              rightSection={formatBigNumber(tokenData?.totalSupply)}
            />
            <TokenDetails
              leftText={"top 10 holders ratio"}
              rightSection={
                isNaN(tokenData?.analysis?.holders?.topTenRatio) ? (
                  "N/A"
                ) : (
                  <RangeSlider
                    percent={tokenData?.analysis?.holders?.topTenRatio}
                  />
                )
              }
            />
          </div>
        </div>
        {!isMobile ? <AccordionHeader /> : null}

        <div className={styles.othersTokenWrapper}>
          {displayData?.map((holder, index) => (
            <TopHolderItem
              key={index}
              index={index}
              holderAddress={holder.address}
              amount={numeral(holder.balance).format("0.00a")}
            />
          ))}
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
              <span className={styles.seeFullList}>
                {hidden ? "see full list" : "hide full list"}
                <ArrowLeft />
              </span>
            </Button>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className={styles.walletBoughtCoin}>
          <div className={`${styles.header} ${styles.holderHeader}`}>
            <div>wallets that bought the coin in the first 10 mins</div>
          </div>
          <AccordionHeader bought />
          {firstBoughData?.map((tx, i) => (
            <AccordionContentHeader
              key={i}
              index={i}
              holderAddress={tx?.to}
              holderAmount={getDisplayAmount(tx?.amount, tokenData?.decimals)}
              boughtText={
                "first " +
                getTimeDiff(
                  new Date(tokenData?.createdAt).getTime(),
                  new Date(tx?.timestamp).getTime()
                )
              }
              link={"https://etherscan.io/address/" + tx?.to}
              arrow={false}
            />
          ))}
          {walletsSectionHidden ? <div className={styles.blur}></div> : null}

          <div
            className={`${mainStyles.center} ${
              walletsSectionHidden
                ? mainStyles.seeFullListButton
                : mainStyles.hideBtn
            }`}
          >
            <Button
              variant="primary"
              onClick={() => {
                setWalletsSectionHidden((prev) => !prev);
              }}
            >
              <span className={styles.seeFullList}>
                {walletsSectionHidden ? "see full list" : "hide full list"}
                <ArrowLeft />
              </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
