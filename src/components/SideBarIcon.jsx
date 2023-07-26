import React from "react";
import { Link } from "react-router-dom";

export default function SideBarIcon({ icon, route }) {
  return (
    <Link to={route} className="sidebar-icon">
      <img src={icon} alt="icon" />
    </Link>
  );
}
