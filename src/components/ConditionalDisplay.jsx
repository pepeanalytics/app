import React from "react";

export default function ConditionalDisplay({ condition, children }) {
  return <>{condition ? children : null}</>;
}
