import React from "react";
import pageStyles from "../styles/NewCoins.module.css";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import { useMediaQuery } from "react-responsive";
import styles from "../styles/Analysis.module.css";
import { Arrow, ArrowLeft } from "../assets/Svg";
import Accordion from "../components/AccordionSection";

import mainStyles from "../styles/Main.module.css";
import Back from "../components/Back";

export default function NewCoins({ imgUrl }) {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={`${pageStyles.container} ${mainStyles.wrapper}`}>
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/main"} />
        </div>

        <div className={`${pageStyles.header} ${styles.header}`}>
          deployer and holders analysis
        </div>

        {!isMobile && (
          <div className={pageStyles.headers}>
            <div className={pageStyles.headerTitle}>Coin name</div>
            <div className={pageStyles.headerTitle}>Launched at</div>
            <div className={pageStyles.headerTitle}>Ruggability</div>
            <div className={pageStyles.headerTitle}>Price</div>
            <div className={pageStyles.headerTitle}>Actions</div>
          </div>
        )}

        <Accordion
          genClass={pageStyles.accordion}
          title={
            <div className={pageStyles.values}>
              <div className={`${pageStyles.value} ${pageStyles.coinName}`}>
                {!imgUrl ? (
                  <span className={pageStyles.coinImg} />
                ) : (
                  <img className={pageStyles.coinImg} src={imgUrl} alt="coin" />
                )}
                Ethereum
              </div>
              {!isMobile && (
                <>
                  <div className={`${pageStyles.value}`}>July 2015</div>
                  <div className={`${pageStyles.value}`}>Medium</div>
                </>
              )}
              <div
                className={`${true ? pageStyles.red : pageStyles.green} ${
                  pageStyles.value
                }  ${pageStyles.price}`}
              >
                $2k
                {isMobile && (
                  <span className={pageStyles.arrow}>
                    <Arrow />
                  </span>
                )}
              </div>
              {!isMobile && (
                <div
                  className={`${pageStyles.red} ${pageStyles.value} ${pageStyles.more}`}
                >
                  See more
                </div>
              )}
            </div>
          }
        >
          {isMobile && (
            <div className={pageStyles.accordionContent}>
              <div>
                <div className={pageStyles.headerTitle}>Launched at</div>
                <div className={`${pageStyles.value}`}>July 2015</div>
              </div>
              <div>
                <div className={pageStyles.headerTitle}>Repeatabilty</div>
                <div className={`${pageStyles.value}`}>12%</div>
              </div>
              <div>
                <div className={pageStyles.headerTitle}>Ruggability</div>
                <div className={`${pageStyles.value}`}>12%</div>
              </div>
              <div
                className={`${pageStyles.red} ${pageStyles.value} ${pageStyles.more}`}
              >
                See more
              </div>
            </div>
          )}
        </Accordion>
      </div>
    </>
  );
}
