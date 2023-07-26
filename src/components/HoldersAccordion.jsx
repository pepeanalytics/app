import React, { cloneElement } from "react";

import styles from "../styles/Analysis.module.css";

import { motion } from "framer-motion";

const HoldersAccordion = ({
  title,
  children,
  genClass,
  openClass,
  black = false,
  isOpen,
  setIsOpen,
}) => {
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
            style={{ overflow: "hidden", width: "100%" }}
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

export default HoldersAccordion;
