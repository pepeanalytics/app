import React from "react";
import MintBtn from "./MintBtn";

export default function HeroLeft({ soldOut }) {
  const handleShowMe = () =>
    window.open(
      "https://medium.com/@pepeanalytics/pepe-analytics-are-you-ready-34bc853c126",
      "_blank"
    );
  return (
    <div className="hero-left">
      <div className={`hello ${soldOut ? "sold-out" : ""}`}>
        hello gambler!
        {soldOut ? <span className="sold-out-banner">Sold out</span> : null}
      </div>
      <div className="reserve">
        {soldOut ? (
          <span>
            all coupons are <br />
            sold ouT!
          </span>
        ) : (
          <span>
            reserve your seat <br className="pc" /> in the casino to get{" "}
            <br className="pc" /> lifetime access
          </span>
        )}
      </div>
      <div className={soldOut ? "eth sold-out-text" : "eth"}>
        {soldOut ? (
          <span>
            the coupons are only available in <br className="pc" />
            secondary markets right now
          </span>
        ) : (
          <span>0.35 eth</span>
        )}
      </div>
      <div className="flex row al-ce mint-btn-wrapper">
        <MintBtn soldOut={soldOut} />

        <p onClick={handleShowMe} className="show-me">
          Show me what it does first
        </p>
      </div>
    </div>
  );
}
