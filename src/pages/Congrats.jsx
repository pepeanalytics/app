import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import CongratsSection from "../components/CongratsSection";

export default function Congrats() {
  return (
    <div className="congrats">
      <HomeHeader />
      <MobNavbar />
      <CongratsSection />
    </div>
  );
}
