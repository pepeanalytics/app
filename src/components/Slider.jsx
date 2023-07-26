import React from "react";
import styles from "../styles/RangeSlider.module.css";
import SmartPriceDisplay from "./SmartPriceDisplay";

const RangeSlider = ({ percent }) => {
  const getBarStyle = () => {
    return {
      left: `${percent}%`,
    };
  };

  return (
    <>
      <div className={styles.rangeSlider}>
        <div className={styles.sliderBar} style={getBarStyle()}></div>
      </div>
      <div className={styles.sliderPercent}>
        <SmartPriceDisplay price={percent || "0"} />%
      </div>
    </>
  );
};

export default RangeSlider;
