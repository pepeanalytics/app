import React from "react";

export default function HeaderWrapper({ children }) {
  return (
    <>
      <div className="header-bg" />
      {children}
    </>
  );
}
