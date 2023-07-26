import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import styles from "../styles/Main.module.css";
import SectionDisplay from "../components/Main/SectionDisplay";
import FlipNumbers from "react-flip-numbers";
import CoinsGrid from "../components/Main/CoinsGrid";
import SplineGraph from "../components/Main/SplineGraph";
import { Pacman } from "../assets/Svg";

// import ContractsGrid from "../components/Main/ContractsGrid";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import TopTokensGrid from "../components/Main/TopTokensGrid";

export default function Main() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["/dashboard/home"],
  });

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  const isMedium = useMediaQuery({ query: `(max-width: 1024px)` });

  const isLarge = useMediaQuery({ query: `(max-width: 1440px)` });

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <SectionDisplay
            onClick={() => navigate("/search-token-sniffer")}
            title="honeypot checker"
            subtitle="honeypot checker"
          />
          <SectionDisplay
            onClick={() => navigate("/search-analysis")}
            title="deployer and holders"
            subtitle="data"
          />
          <SectionDisplay
            onClick={() => {
              navigate("/social");
            }}
            title="social analytics"
            subtitle="pepeai holders"
          />
          <div className={styles.sectionDisplay}>
            <div className={styles.sectionDisplayInset}>
              <div className={styles.sectionDisplayContentGasPrice}>
                <div>
                  <FlipNumbers
                    width={30}
                    height={56}
                    play
                    color="#fff"
                    background-image={`linear-gradient(180deg, transparent 0%, #0e0d0d 100%)`}
                    numberStyle={{
                      fontSize: 16,
                    }}
                    delay={2}
                    duration={1.5}
                    numberClassName={styles.flipNumbers}
                    nonNumberClassName={styles.flipNonNumbers}
                    numbers={
                      data?.currentGas
                        ? Math.floor(data.currentGas).toString()
                        : "0"
                    }
                  />
                </div>
                <div className={styles.sectionDisplayGasPrice}>
                  <div className={styles.sectionDisplayTitle}>gwei</div>
                  <div className={styles.sectionDisplaySubtitle}>
                    Current gas Price
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.text}>Will it be the one today?</div>
          <div className={styles.center}>
            <img
              className={styles.coinLeft}
              src={require("../assets/images/coinLeft.png")}
              alt="coin"
            />
            <img
              className={styles.coinRight}
              src={require("../assets/images/coinRight.png")}
              alt="coin"
            />
            <div className={styles.coinsToday}>
              <FlipNumbers
                width={
                  isMobile
                    ? 30
                    : isMedium
                    ? 40
                    : isLarge
                    ? 60
                    : isLarge
                    ? 70
                    : 80
                }
                height={isMobile ? 40 : isMedium ? 70 : isLarge ? 90 : 136}
                play
                color="#fff"
                background-image={`linear-gradient(180deg, transparent 0%, #0e0d0d 100%)`}
                numberStyle={{
                  fontSize: isMobile ? 18 : isMedium ? 22 : isLarge ? 30 : 38,
                }}
                delay={1.5}
                duration={1.5}
                numberClassName={styles.flipNumbers}
                nonNumberClassName={styles.flipNonNumbers}
                numbers={data?.pairsCount?.toString() || "0"}
              />

              <div className={styles.coinsTodayText}>new pairs today</div>
            </div>
          </div>
        </div>
        <CoinsGrid />
        <div className={styles.sectionHeader}>
          Daily DEX's Volume <Pacman />
        </div>
        {data?.chartData ? <SplineGraph chartData={data?.chartData} /> : <></>}
        {/* <div className={styles.center}>
          <div className={`${styles.coinsToday} ${styles.contractsDeployed}`}>
            <FlipNumbers
              width={
                isMobile ? 30 : isMedium ? 40 : isLarge ? 60 : isLarge ? 70 : 80
              }
              height={isMobile ? 40 : isMedium ? 70 : isLarge ? 90 : 136}
              play
              color="#fff"
              background-image={`linear-gradient(180deg, transparent 0%, #0e0d0d 100%)`}
              numberStyle={{
                fontSize: isMobile ? 18 : isMedium ? 22 : isLarge ? 30 : 38,
              }}
              delay={2}
              duration={1.5}
              numberClassName={styles.flipNumbers}
              nonNumberClassName={styles.flipNonNumbers}
              numbers={data ? data.contractsDeployedCount.toString() : `0`}
            />

            <div className={styles.coinsTodayText}>
              Contracts deployed on uniswap in the last 60 mins
            </div>
          </div>
        </div> */}
        <div className={styles.sectionHeader}>
          Top 10 tokens <Pacman />
        </div>
        <TopTokensGrid />
        <div className={styles.copy}>
          Copyright 2023 pepe analytics. all rights reserved.
        </div>
      </div>
    </>
  );
}
