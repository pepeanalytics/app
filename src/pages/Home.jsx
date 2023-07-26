import React from "react";
import HomeHeader from "../components/HomeHeader";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import MobNavbar from "../components/MobNavbar";

export default function Home({ soldOut }) {
  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <Hero soldOut={soldOut} />
      <Footer />
    </>
  );
}
