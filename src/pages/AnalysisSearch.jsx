import React, { useState } from "react";
import destinyStyles from "../styles/Destiny.module.css";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import Search from "../components/Search";
import Breadcrumbs from "../components/Breadcrumbs";
import { useMediaQuery } from "react-responsive";

import mainStyles from "../styles/Main.module.css";
import Back from "../components/Back";
import { analysisAddressState } from "../recoil/search";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  analysisHoneyPotBreadCrumb,
  homeBreadCrumb,
} from "../utils/breadCrumbConsts";

const path = [homeBreadCrumb, analysisHoneyPotBreadCrumb];

export default function AnalysisSearch() {
  const [search, setSearch] = useRecoilState(analysisAddressState);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search) {
      navigate(`/analysis?address=${search}`);
    }
  };

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={`${destinyStyles.container} ${mainStyles.wrapper}`}>
        <div className={`${destinyStyles.analysisBg} ${destinyStyles.bg}`} />
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/main"} text="Home" />
        </div>
        <div className={destinyStyles.content}>
          <div className={destinyStyles.header}>
            deployer and holders analysis
          </div>
          <Search
            search={search}
            setSearch={handleChange}
            placeholder="0x295201950mc09292051245f"
            onSearchClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
