import React from "react";
import { SocailButtons } from "./CtaButtons";
import HeroRight from "./HeroRight";

export default function CongratsSection() {
  return (
    <div className="hero">
      <div>
        <div className="reserve">
          Congrats on <br className="pc" />
          acquiring the pepeai nft coupon
        </div>
        <div className={"eth sold-out-text"}>
          we are currently working on a mvp. follow our social media to stay
          updated!
        </div>
        <div className="flex row al-ce mint-btn-wrapper">
          <SocailButtons />
        </div>
      </div>
      <HeroRight />
    </div>
  );
}
