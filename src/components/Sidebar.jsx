import React from "react";

import homeIcon from "../assets/images/home.svg";
import frog from "../assets/images/frog.png";
import magnifierIcon from "../assets/images/magnifier.svg";
import user from "../assets/images/user.svg";
import chartIcon from "../assets/images/chart.svg";
import sniper from "../assets/images/sniper.svg";

import SideBarIcon from "./SideBarIcon";

const Icons = [
  {
    icon: homeIcon,
    link: "/",
  },
  {
    icon: frog,
    link: "/main",
  },
  {
    icon: magnifierIcon,
    link: "/search-token-sniffer",
  },
  {
    icon: chartIcon,
    link: "/search-analysis",
  },
  {
    icon: user,
    link: "/social",
  },
  {
    icon: sniper,
    link: "/sniper",
  },
];

export default function Sidebar() {
  return (
    <div className="siderbarWrapper">
      <div className="sidebar">
        {Icons.map(({ icon, link }, index) => {
          return <SideBarIcon key={index} route={link} icon={icon} />;
        })}
      </div>
    </div>
  );
}
