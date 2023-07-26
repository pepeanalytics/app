import React from "react";

export default function HeroRight() {
  return (
    <div className="hero-right">
      <img
        className="pc"
        src={require("../assets/images/passes.png")}
        alt="passes"
      />
      <img
        className="mob"
        src={require("../assets/images/mobHero.png")}
        alt="passes"
      />
    </div>
  );
}
