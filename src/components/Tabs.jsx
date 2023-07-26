import React from "react";

import styles from "../styles/Tabs.module.css";

const Tab = ({ tabs, activeTab, setActiveTab }) => {
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tab;
