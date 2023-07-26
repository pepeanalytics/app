import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import { useMediaQuery } from "react-responsive";
import Breadcrumbs from "../components/Breadcrumbs";

import destinyStyles from "../styles/Destiny.module.css";
import SectionDisplay from "../components/Main/SectionDisplay";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { homeBreadCrumb, sniperBreadCrumb } from "../utils/breadCrumbConsts";

const path = [homeBreadCrumb, sniperBreadCrumb];

export default function Sniper() {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  const navigation = useNavigate();

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={destinyStyles.container}>
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/main"} text={"Home"} />

          {!isMobile && <Breadcrumbs path={path} />}
        </div>
        <div className={destinyStyles.coin}>
          <img src={require("../assets/images/coinLeft.png")} alt="coin" />
        </div>
        <div className={destinyStyles.coinRight}>
          <img src={require("../assets/images/coinRight.png")} alt="coin" />
        </div>
        <div className={`flex al-ce ${destinyStyles.section}`}>
          <h1 className={destinyStyles.title}>SNIPER</h1>

          <div className={destinyStyles.left}>
            <div className={destinyStyles.leftBg}></div>
            <SectionDisplay
              title="SNIPER BOTS AGGREGATOR"
              onClick={() => navigation(null)}
            />
            <div className={destinyStyles.option1}>- COMING SOON!</div>
          </div>
          <div className={destinyStyles.right}>
            <div className={destinyStyles.rightBg}></div>
            <SectionDisplay title="Api Pricing" />
            <div className={destinyStyles.option1}>- COMING SOON!</div>
            <div className={destinyStyles.option2}></div>
          </div>
        </div>
      </div>
    </>
  );
}
