import React from "react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero({ soldOut }) {
  return (
    <div className="hero">
      <HeroLeft soldOut={soldOut} />
      <HeroRight />
    </div>
  );
}
