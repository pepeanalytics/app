import React from "react";
import styles from "../../styles/Main.module.css";
import { ArrowLeft } from "../../assets/Svg";

export default function SectionDisplay({
  onClick,
  title,
  subtitle,
  hideArrow = false,
}) {
  return (
    <div className={styles.sectionDisplay} onClick={onClick}>
      <div className={styles.sectionDisplayInset}>
        <div
          className={styles.sectionDisplayContent}
          style={{
            justifyContent: hideArrow ? "center" : "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              className={styles.sectionDisplayTitle}
              style={
                hideArrow
                  ? {
                      display: "flex",
                      justifyContent: hideArrow ? "center" : "flex-start",
                    }
                  : null
              }
            >
              {title}
            </div>
            {subtitle && (
              <div className={styles.sectionDisplaySubtitle}>{subtitle}</div>
            )}
          </div>
          {!hideArrow ? (
            <div className={styles.sectionDisplayArrow}>
              <ArrowLeft />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
