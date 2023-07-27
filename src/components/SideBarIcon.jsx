import React from "react";
import { Link } from "react-router-dom";

export default function SideBarIcon({ icon, route, current, routes }) {
  return (
    <Link to={route} className="sidebar-icon" style={{ boxShadow: routes.includes(current) ? "0px 0px 10px 0px rgba(238,51,125,1)" : "" }}>
      <img 
        src={icon} 
        alt="icon" 
      />
    </Link>
  );
}
