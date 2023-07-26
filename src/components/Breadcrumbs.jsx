import React from "react";

const Breadcrumbs = ({ path }) => {
  return (
    <div className="breadcrumbs">
      {path.map((crumb, index) => (
        <span key={index}>
          <a
            className={index === path.length - 1 ? "active" : ""}
            href={crumb.url}
          >
            {crumb.label}
          </a>
          {index < path.length - 1 && <span> &gt; </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
