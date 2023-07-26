import { useState } from "react";
import InfoRow from "../components/HoldersInfo/InfoRow";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import Search from "../components/Search";
import styles from "../styles/TokenDetails.module.css";
import { Arrow, CopyIcon, Pacman } from "../assets/Svg";
import InfoIcon from "../assets/images/Info.svg";
import ErrorIcon from "../assets/images/minusBullet.png";
import PinkTick from "../assets/images/pinkTick.png";
import HolderTypes from "../components/Analysis/HolderTypes";
import PieChart from "../components/Analysis/PieChart";
import blueArrows from "../assets/images/blueArrow.png";
import Breadcrumbs from "../components/Breadcrumbs";
import { useMediaQuery } from "react-responsive";

import Back from "../components/Back";
import {
  homeBreadCrumb,
  tokenSnifferBreadCrumb,
  tokenSniffersHoneyPotBreadCrumb,
} from "../utils/breadCrumbConsts";

const Labels = ["Locked", "Unlocked", "Burned", "Owner"];
const ChartData = [90, 5, 3, 2];
const Colors = ["#E1007F", "#49B7AB", "#EE5018", "#FFFFFF"];

const path = [
  homeBreadCrumb,
  tokenSniffersHoneyPotBreadCrumb,
  tokenSnifferBreadCrumb,
];

export default function TokenDetailsPage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={styles.container}>
        <div className={styles.bodyContainer}>
          <div className={`flex sb al-ce back-component`}>
            <Back path={"/main"} />

            {!isMobile && <Breadcrumbs path={path} />}
          </div>
          <div className={styles.topSection}>
            <span className={styles.hero}>D. 5</span>
          </div>
          <Search
            search={search}
            setSearch={handleSearch}
            placeholder="0x000000"
          />

          <div className={styles.header}>results:</div>
          <InfoRow firstName={"lotto"} lastName={"lotto"} score={0} />
          <div className={styles.section}>
            <div className={styles.header}>
              Basic Token Info
              <Pacman />
            </div>
            <div className={styles.basicInfoContainer}>
              <BasicInfo type={"rc20"} address={"0x295201950mc09292051245f"} />
              <BasicInfo type={"rc20"} address={"0x295201950mc09292051245f"} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.header}>
              Token detectors
              <Pacman />
            </div>
            <div className="flex col">
              <TokenDetectors
                type={"risk"}
                header={"trader fee"}
                desc={
                  "A fee is charged upon transfering this token (up to 100%). Exploit Example"
                }
              />
              <TokenDetectors
                type={"risk"}
                header={"trader fee"}
                desc={
                  "A fee is charged upon transfering this token (up to 100%). Exploit Example"
                }
              />
              <TokenDetectors type={"normal"} header={"No locks detected"} />
              <TokenDetectors
                type={"normal"}
                header={"verified source code found"}
              />
              <TokenDetectors
                type={"attention"}
                header={"blacklisting"}
                desc={
                  "Wallets can be blacklisted from being able to transfer, swap or sell this token."
                }
              />
              <TokenDetectors
                type={"attention"}
                header={"blacklisting"}
                desc={
                  "Wallets can be blacklisted from being able to transfer, swap or sell this token."
                }
              />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.header}>
              token liquidity analysis
              <Pacman />
            </div>
            <div className={styles.liquidityAnalysis}>
              {isMobile ? null : (
                <div className={`flex row ${styles.arrowsLeft}`}>
                  <img src={blueArrows} />
                  <img src={blueArrows} />
                </div>
              )}
              <PieChart labels={Labels} data={ChartData} colors={Colors} />
              <div>
                {Labels.map((label, index) => (
                  <HolderTypes
                    key={index}
                    name={label}
                    percent={ChartData[index]}
                    color={Colors[index]}
                  />
                ))}
              </div>
              {isMobile ? null : (
                <div className={`flex row ${styles.arrowsRight}`}>
                  <img src={blueArrows} />
                  <img src={blueArrows} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TokenDetectors = ({ type, header = "", desc = "" }) => {
  const typeObj = {
    attention: { suffix: "Attention required", imgSrc: InfoIcon },
    risk: { suffix: "High risk", imgSrc: ErrorIcon },
    normal: { suffix: " ", imgSrc: PinkTick },
  };

  return (
    <div className={`${styles.detectorContainer} ${styles[type]}`}>
      <div className={styles.detectorLeft}>
        <img src={typeObj[type].imgSrc} />
        <div className={styles.detectorDetailsCol}>
          <div className={styles.detectorHeader}>
            <span>{header}</span>
            <span className={styles.headerSuffix}>{typeObj[type].suffix}</span>
          </div>
          {desc && <div className={styles.detectorDesc}>{desc}</div>}
        </div>
      </div>
      <div className={styles.downArrow}>{type !== "normal" && <Arrow />}</div>
    </div>
  );
};

const BasicInfo = ({ type, address }) => {
  return (
    <div className="flex col">
      <div className={styles.infoRow}>
        <div>token type</div>
        <div>
          <span>{type}</span>
          <CopyIcon />
        </div>
      </div>
      <div className={styles.infoRow}>
        <div>token contact address</div>
        <div>
          <span className={styles.basicInfoAddress}>{address}</span>
          <CopyIcon />
        </div>
      </div>
    </div>
  );
};
