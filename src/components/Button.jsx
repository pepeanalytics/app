import React from "react";

export default function Button({ variant, children, ...props }) {
  return (
    <div {...props} className={`button button-${variant}`}>
      {children}
    </div>
  );
}

export const RoundButton = ({ children, ...props }) => {
  return (
    <button {...props} className={`round-btn`}>
      {children}
    </button>
  );
};
