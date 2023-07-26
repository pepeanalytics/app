import React, { useState } from "react";
import destinyStyles from "../styles/Destiny.module.css";

import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import Search from "../components/Search";

import mainStyles from "../styles/Main.module.css";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenSnifferAddressState } from "../recoil/search";

export default function TokenSnifferSearch() {
  const [search, setSearch] = useRecoilState(tokenSnifferAddressState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search) {
      navigate(`/token-sniffer?address=${search}`);
    }
  };

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={`${destinyStyles.container} ${mainStyles.wrapper}`}>
        <div className={destinyStyles.bg} />
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/main"} text="home" />
        </div>
        <div className={destinyStyles.content}>
          <div className={destinyStyles.header}>token sniffer</div>
          <div className={destinyStyles.subHeader}>honeypot checker</div>
          <Search
            search={search}
            setSearch={handleChange}
            placeholder="0x295201950mc09292051245f"
            onSearchClick={handleSearch}
          />
          <div className={destinyStyles.subText}>
            paste the address and find out what technical features are behind
            the contract
          </div>
        </div>
      </div>
    </>
  );
}
