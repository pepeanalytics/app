import React, { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRecoilState } from "recoil";
import { isTooltipOpenState } from "../recoil";

export default function Tooltip() {
  const [isTooltipOpen, toggleTooltip] = useRecoilState(isTooltipOpenState);

  useEffect(() => {
    if (isTooltipOpen) {
      setTimeout(() => {
        toggleTooltip(false);
      }, 5000);
    }
  }, [isTooltipOpen]);

  return (
    <ReactTooltip
      style={{
        backgroundColor: "#e1007f",
        color: "#fff",
        fontSize: ".75rem",
      }}
      id="tooltip"
      place="top"
      isOpen={isTooltipOpen}
    />
  );
}
