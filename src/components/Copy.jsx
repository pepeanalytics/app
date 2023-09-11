import React from "react";
import styles from "../styles/Verify.module.css";
import { CopyIcon } from "../assets/Svg";
import { toast } from "react-toastify";
import Button from "./Button";
import { useParams } from "react-router-dom";

export default function Copy() {
  let { code } = useParams();
  return (
    <div className={styles.copy}>
      <div className={styles.header}>
        Copy and paste the following message to the bot to finish authenticating
      </div>

      <div className={`${styles.copyWrapper}`}>
        <div className={styles.copyText}>{code}</div>
        <Button
          variant={"primary"}
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast.success("Copied to clipboard");
          }}
        >
          <span className={styles.copyIcon}>
            Copy
            <CopyIcon />
          </span>
        </Button>
      </div>
    </div>
  );
}
