import React, { useState } from "react";
import styles from "../styles/Analysis.module.css";
import hideBtnStyles from "../styles/Main.module.css";
import Button, { RoundButton } from "../components/Button";
import { Pacman } from "../assets/Svg";
import HolderTypes from "../components/Analysis/HolderTypes";
import TokenDetails from "../components/Analysis/TokenDetails";
import AnalysisSplineGraph from "../components/Analysis/SplineGraph";
import PieChart from "../components/Analysis/PieChart";
import { useMediaQuery } from "react-responsive";
import binanceLogo from "../assets/images/binance.png";
import HoldingCoinCard from "../components/Analysis/HoldingCoin";
import { ArrowLeft } from "../assets/Svg";
import minusBullet from "../assets/images/blueArrow.png";
import { shortenWalletAddress } from "../utils/shortenWallet";
import { useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import { formatUnits } from "ethers";
import UniversalLoader from "../components/UniversalLoader";
import getDisplayAmount from "../utils/getDisplayAmount";

const Labels = ["Creator", "Community"];
const ChartData = [6, 94];
const Colors = ["#FFFFFF", "#e1007f"];

export default function DeployerData({ deployerAddress }) {
  const [hidden, setHidden] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const {
    data: deployerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      `/address/${deployerAddress}?is_deployer=true&include_history=true`,
    ],
    enabled: deployerAddress.length > 0,
  });

  if (isError) return <div>An error occurred</div>;

  return (
    <>
      <div className={styles.section}>
        <div className={`${styles.header} ${styles.holderHeader}`}>
          deployer data
          <Pacman />
        </div>
        <div className={styles.addressText}>
          {isMobile ? shortenWalletAddress(deployerAddress) : deployerAddress}
        </div>
      </div>

      {/* <div className={styles.section}>
        <div>funded by:</div>
        <button className={styles.fundedByButton}>
          <img className={styles.binanceLogo} src={binanceLogo} alt="binance" />
        </button>
      </div> */}
      {isLoading ? (
        <UniversalLoader />
      ) : (
        <>
          <div className={`${styles.section} ${styles.holdingsSection}`}>
            <div className={`${styles.header} ${styles.holderHeader}`}>
              holding coins
              <Pacman />
            </div>
            <div
              className={`${styles.holdingCoinSection} ${
                hidden ? styles.holdingHidden : ""
              }`}
            >
              {deployerData?.tokens?.length === 0 ? (
                <div>No holding coins</div>
              ) : null}
              {deployerData?.tokens?.map((token, i) => (
                <HoldingCoinCard
                  key={i}
                  name={token.tokenInfo.name}
                  amount={
                    token.tokenInfo.decimals
                      ? getDisplayAmount(
                          token.rawBalance,
                          token.tokenInfo.decimals
                        )
                      : "Pool Position"
                  }
                />
              ))}
            </div>
            <div className={styles.hideBtnSection}>
              {hidden && <div className={styles.blur}></div>}
              <div
                className={`${styles.hideButtonWrapper} ${
                  hidden ? styles.expand : styles.hide
                }`}
              >
                <Button variant="primary" onClick={() => setHidden(!hidden)}>
                  <span className={styles.seeFullList}>
                    {hidden ? "expand" : "hide"} list
                    <ArrowLeft />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* <div className={styles.section}>
            <div className={`${styles.header} ${styles.holderHeader}`}>
              deployer history
              <Pacman />
            </div>
            {deployerData?.history?.length === 0 ? <div>No history</div> : null}
            {deployerData?.history?.map((history, i) => (
              <div className={styles.historyRow} key={i}>
                <a href="">{history.transactionHash}</a>
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <div className={`${styles.header} ${styles.holderHeader}`}>
              allocated coins
              <Pacman />
            </div>
            <div className={styles.allocatedCoin}>
              <div className={`flex row ${styles.arrowsLeft}`}>
                <img src={minusBullet} />
                <img src={minusBullet} />
              </div>
              <PieChart
                labels={Labels}
                data={ChartData}
                colors={Colors}
                responsive={[
                  {
                    breakpoint: 768,
                    options: {
                      chart: {
                        width: 100,
                        height: 100,
                      },
                    },
                  },
                ]}
              />
              <div className="flex col al-st">
                <div className={styles.creatorText}>6% for creator</div>
                <div className={styles.communityText}> 94 for community</div>
              </div>
              <div className={`flex row ${styles.arrowsRight}`}>
                <img src={minusBullet} />
                <img src={minusBullet} />
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}
