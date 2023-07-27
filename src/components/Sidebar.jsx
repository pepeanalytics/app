import React from "react";

import homeIcon from "../assets/images/home.svg";
import frog from "../assets/images/frog.png";
import magnifierIcon from "../assets/images/magnifier.svg";
import user from "../assets/images/user.svg";
import chartIcon from "../assets/images/chart.svg";
import sniper from "../assets/images/sniper.svg";

import SideBarIcon from "./SideBarIcon";
import { useLocation } from "react-router-dom";

const Icons = [
  {
    icon: homeIcon,
    link: "/",
    links: [""]
  },
  {
    icon: frog,
    link: "/main",
    links: ["/main"]
  },
  {
    icon: magnifierIcon,
    link: "/search-token-sniffer",
    links: ["/search-token-sniffer", "/token-sniffer"]
  },
  {
    icon: chartIcon,
    link: "/search-analysis",
    links: ["/search-analysis", "/analysis"]
  },
  {
    icon: user,
    link: "/social",
    links: ["/social", "/holders"]
  },
  {
    icon: sniper,
    link: "/sniper",
    links: ["/sniper"]
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="siderbarWrapper">
      <div className="sidebar">
        {Icons.map(({ icon, link, links }, index) => {
          return <SideBarIcon routes={links} key={index} route={link} icon={icon} current={pathname} />;
        })}
      </div>
    </div>
  );
}
