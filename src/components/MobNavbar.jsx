import React from "react";
import logo from "../assets/images/logo.png";
import Button from "./Button";
import { useSetRecoilState } from "recoil";
import { isDrawerOpen } from "../recoil";
import { Link } from "react-router-dom";

export default function MobNavbar() {
  const setDrawerOpen = useSetRecoilState(isDrawerOpen);
  return (
    <div className="mobnav-container mob">
      <Link to="/main">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <div className="navbar-right flex al-ce">
        <Button variant={"secondary"}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9.339"
              height="15.042"
              viewBox="0 0 9.339 15.042"
            >
              <g id="eth-svgrepo-com" transform="translate(-44.158 0.09)">
                <path
                  id="Path_631"
                  data-name="Path 631"
                  d="M48.68,91.607v-4.63l-4.522,1.981Z"
                  transform="translate(0 -81.31)"
                  fill="#fff"
                />
                <path
                  id="Path_632"
                  data-name="Path 632"
                  d="M50.739,5.38V-.056L46.362,7.3Z"
                  transform="translate(-2.058 -0.032)"
                  fill="#fff"
                />
                <path
                  id="Path_633"
                  data-name="Path 633"
                  d="M116.962-.09V5.349L121.4,7.293Z"
                  transform="translate(-67.99)"
                  fill="#fff"
                />
                <path
                  id="Path_634"
                  data-name="Path 634"
                  d="M116.962,86.977v4.63l4.526-2.648Z"
                  transform="translate(-67.99 -81.31)"
                  fill="#fff"
                />
                <path
                  id="Path_635"
                  data-name="Path 635"
                  d="M49.11,137.664V133.94l-4.492-2.63Z"
                  transform="translate(-0.43 -122.712)"
                  fill="#fff"
                />
                <path
                  id="Path_636"
                  data-name="Path 636"
                  d="M116.962,137.664l4.492-6.354-4.492,2.63Z"
                  transform="translate(-67.99 -122.712)"
                  fill="#fff"
                />
              </g>
            </svg>
          </span>
        </Button>

        <Button variant={"secondary"} onClick={() => setDrawerOpen(true)}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11.019"
              height="9.861"
              viewBox="0 0 11.019 9.861"
            >
              <g id="menu" transform="translate(0 -5.333)">
                <path
                  id="Path_241"
                  data-name="Path 241"
                  d="M0,15.195V13.551H11.019v1.644Zm0-4.109V9.442H11.019v1.644ZM0,5.333H11.019V6.977H0Z"
                  fill="#fff"
                />
              </g>
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
}
