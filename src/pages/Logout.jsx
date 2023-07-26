import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/main";
  }, []);

  return <></>;
}
