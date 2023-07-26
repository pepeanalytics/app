import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="loader">
      <motion.img
        className="loader__img"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        src={require("../assets/images/welcome.webp")}
        alt="loader"
      />
      <motion.img
        className="mobile_loader__img"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        src={require("../assets/images/welcome_mobile.webp")}
        alt="loader"
      />
    </div>
  );
}
