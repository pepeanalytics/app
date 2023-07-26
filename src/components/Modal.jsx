import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { CloseSvg } from "../assets/Svg";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          opacity: isOpen ? 1 : 0,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
        className="modal-content-wrapper"
      >
        <div className="modal-close-button" onClick={onClose}>
          <CloseSvg />
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ delay: 0.25 }}
          className="modal-content"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
