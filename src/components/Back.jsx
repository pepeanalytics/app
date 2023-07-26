import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "../assets/Svg";
import styles from "../styles/Analysis.module.css";

export default function Back({ path, text = "search" }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(path);
      }}
      className={`flex al-ce jc ${styles.back}`}
    >
      <ArrowLeft />
      <span>back to {text}</span>
    </div>
  );
}
