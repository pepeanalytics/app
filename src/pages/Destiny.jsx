import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import { useMediaQuery } from "react-responsive";
import Breadcrumbs from "../components/Breadcrumbs";

import destinyStyles from "../styles/Destiny.module.css";
import SectionDisplay from "../components/Main/SectionDisplay";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { destinyBreadCrumb, homeBreadCrumb } from "../utils/breadCrumbConsts";

const path = [homeBreadCrumb, destinyBreadCrumb];

export default function Destiny() {
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
          <h1 className={destinyStyles.title}>SOCIAL ANALYTICS</h1>

          <div className={destinyStyles.left}>
            <div className={destinyStyles.leftBg}></div>
            <SectionDisplay
              title="pepeai holders analysis"
              onClick={() => navigation("/holders")}
            />
            <div className={destinyStyles.option1}>- keep track of all</div>
            <div className={destinyStyles.option2}>
              pepe ai holders and their transactions
            </div>
          </div>
          <div className={destinyStyles.right}>
            <div className={destinyStyles.rightBg}></div>
            <SectionDisplay title="Alpha Scan" />
            <div className={destinyStyles.option1}>- COMING SOON!</div>
            <div className={destinyStyles.option2}></div>
          </div>
        </div>
      </div>
    </>
  );
}
