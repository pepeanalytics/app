import React from "react";
import frog from "../assets/images/frog.png";
import homeIcon from "../assets/images/home.svg";
import magnifierIcon from "../assets/images/magnifier.svg";
import user from "../assets/images/user.svg";
import chartIcon from "../assets/images/chart.svg";
import sniper from "../assets/images/sniper.svg";

import Button from "./Button";
import CtaButtons from "./CtaButtons";
import logo from "../assets/images/logo.png";
import { useRecoilState } from "recoil";
import { isDrawerOpen } from "../recoil";
import { Link, NavLink } from "react-router-dom";

export default function MobDrawer() {
  const [drawerOpen, setDrawerOpen] = useRecoilState(isDrawerOpen);
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div
      className={`mob-drawer__container mob ${drawerOpen ? "enter" : "exit"}`}
    >
      <div className="mobnav-container">
        <Link to="/main">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="flex row navbar-right">
          <Button
            variant="secondary"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span className="navbar-right__small-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7.029"
                height="11.145"
                viewBox="0 0 7.029 11.145"
              >
                <g id="back" transform="translate(15.029 12.288) rotate(180)">
                  <path
                    id="Path_246"
                    data-name="Path 246"
                    d="M13.642,1.143,8,6.785l5.5,5.5L14.889,10.9,10.774,6.785,15.029,2.53Z"
                    fill="#fff"
                    fill-rule="evenodd"
                  />
                </g>
              </svg>
            </span>
          </Button>
        </div>
      </div>
      <div className="flex col mob-drawer__links">
        <Nav
          icon={homeIcon}
          title={"HOME"}
          closeDrawer={closeDrawer}
          route={"/"}
        />
        <Nav
          icon={frog}
          title={"DASH"}
          closeDrawer={closeDrawer}
          route={"/main"}
        />
        <Nav
          icon={magnifierIcon}
          closeDrawer={closeDrawer}
          title={"TOKEN SNIFFER"}
          route={"/search-token-sniffer"}
        />
        <Nav
          icon={chartIcon}
          closeDrawer={closeDrawer}
          title={"DEPLOYER"}
          route={"/search-analysis"}
        />
        <Nav
          icon={user}
          closeDrawer={closeDrawer}
          title={"SOCIAL ANALYTICS"}
          route={"/social"}
        />
        <Nav
          icon={sniper}
          closeDrawer={closeDrawer}
          title={"SNIPER BOTS"}
          route={"/sniper"}
        />
      </div>
      <CtaButtons />
    </div>
  );
}

function Nav({ icon, title, route, closeDrawer }) {
  return (
    <NavLink onClick={closeDrawer} className="mob-drawer__nav-link" to={route}>
      <img src={icon} alt="nav-icon" />
      <span className="nav-link__title">{title}</span>
    </NavLink>
  );
}
