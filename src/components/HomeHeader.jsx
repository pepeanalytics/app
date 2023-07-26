import React from "react";
import CtaButtons from "./CtaButtons";
import HeaderWrapper from "./HeaderWrapper";
import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <HeaderWrapper>
      <div className="header flex al-ce row sb w-100">
        <Link to="/main" className="flex row">
          <img
            className="home-header__logoMain"
            src={require("../assets/images/logoMain.png")}
            alt="logoMain"
          />
          <img
            className="home-header__logo"
            src={require("../assets/images/logo@2x.png")}
            alt="logo"
          />
        </Link>

        <CtaButtons />
      </div>
    </HeaderWrapper>
  );
}
