import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";

export default function Roadmap() {
  return (
    <div className="roadmap">
      <HomeHeader />
      <MobNavbar />
      <div className="roadmap__container">
        <div className="roadmap__title">Roadmap</div>
        <div className="roadmap__subtitle">before launch</div>
        <div className="roadmap__grid top">
          <div className="roadmap__grid__item">
            mint of coupons
            <br />
            NFT 07/06/2023
            <br />
            8AM UTC
            <br />
            (400 coupons)
          </div>
          <div className="roadmap__grid__item">
            July ETA
            <br />
            launch of MVP
            <br />
            dashboard + Coupon
            <br />
            NFT redemption
            <br />
            for PEPEAI tokens
          </div>
        </div>

        <div className="roadmap__subtitle">after launch</div>

        <div className="roadmap__grid bottom">
          <div className="roadmap__grid__item">
            PNL leaderboard
            <br />
            integration
          </div>
          <div className="roadmap__grid__item">
            AI/ML prediction
            <br />
            scores
          </div>
        </div>
      </div>
    </div>
  );
}
