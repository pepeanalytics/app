import React, { cloneElement, useState } from "react";
import { motion } from "framer-motion";

import styles from "../styles/Analysis.module.css";
import { Arrow } from "../assets/Svg";
import { useMediaQuery } from "react-responsive";
import { shortenWalletAddress } from "../utils/shortenWallet";
import SmartPriceDisplay from "./SmartPriceDisplay";

const Accordion = ({ title, children, genClass, openClass, black = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const clonedTitle = cloneElement(title, { isOpen });

  return (
    <div className={`${genClass} ${isOpen ? openClass : ""}`}>
      <div
        className={`accordion-header ${isOpen ? "open" : ""}`}
        onClick={toggleAccordion}
      >
        {clonedTitle}
      </div>
      <div>
        <div className="flex">
          {black ? <div className={styles.black} /> : null}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", width: "100%", position: "relative" }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            // different transition for height and opacity
            transition={{
              duration: 0.5,
              ease: [0.04, 0.62, 0.23, 0.98],
              opacity: { duration: 0.25 },
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const AccordionHeader = ({ bought }) => {
  return (
    <div className={styles.accordionHeader}>
      <div>No.</div>
      <div>Holder Address</div>
      <div>Holder Amount</div>
      <div>{bought ? "Bought" : null}</div>
    </div>
  );
};

export const AccordionContentHeader = ({
  index,
  holderAddress,
  holderAmount,
  boughtText,
  isOpen,
  link,
  arrow = true,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div
      className={styles.accordionContentHeader}
      style={{
        cursor: boughtText ? "default" : "pointer",
      }}
    >
      <div className={styles.accordionContentHeaderIndex}>{index + 1}</div>
      <a
        className={styles.accordionContentHeaderAddress}
        target="_blank"
        href={link}
      >
        {shortenWalletAddress(holderAddress)}
      </a>
      {!isMobile && (
        <div className={styles.accordionContentHeaderAmount}>
          {/* checks if the amount ends with K or M or B or T */}
          {/[KMBT]$/.test(holderAmount) ? (
            holderAmount
          ) : (
            <SmartPriceDisplay price={holderAmount} />
          )}
        </div>
      )}
      <div className={styles.accordionContentHeaderButton}>
        {!isMobile
          ? boughtText
            ? boughtText
            : isOpen
            ? "Close other coins"
            : "See other coins"
          : null}
        {arrow ? (
          <span
            style={{
              transform: !isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Arrow fill={"#fff"} />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Accordion;
