import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import ComingSoonSection from "../components/ComingSoonSection";

export default function ComingSoon() {
  return (
    <div className="coming-soon">
      <HomeHeader />
      <MobNavbar />
      <ComingSoonSection />
    </div>
  );
}
