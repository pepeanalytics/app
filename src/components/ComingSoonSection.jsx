import React from "react";
import { SocailButtons } from "./CtaButtons";

export default function ComingSoonSection() {
  return (
    <div className="hero">
      <img
        src={require("../assets/images/clock.png")}
        alt="clock"
        className="clock"
      />
      <div className="reserve">Coming soon!</div>
      <div className={"eth sold-out-text"}>
        we are currently <br className="mob" />
        working on a mvp. <br />
        follow our social media to stay <br className="pc" />
        updated!
      </div>
      <div className="flex row al-ce mint-btn-wrapper">
        <SocailButtons />
      </div>
    </div>
  );
}
