import React from "react";

import styles from "../../styles/HoldersInfo.module.css";
import purpleLink from "../../assets/images/pupleLink.png";
import FileIcon from "../../assets/images/fileIcon.svg";
import Score from "./Score";
import uniswapLogo from "../../assets/images/uniswap.png";

export default function InfoRow({
  firstName,
  lastName,
  score,
  address,
  hideScore = false,
  link = false,
  imgLink,
}) {
  const imgSrc = () => {
    if (!imgLink || imgLink == "N/A") return uniswapLogo;
    return `https://ethplorer.io/${imgLink}`;
  };
  return (
    <div className={styles.infoContainer}>
      <div className="flex al-ce row jc">
        <div className={styles.imgBg}>
          {imgSrc() && <img className={styles.img} src={imgSrc()} alt="link" />}

          <div className={styles.purpleCircle}>
            {link && <img src={purpleLink} alt="link" />}
          </div>
        </div>
        <div className={styles.nameCol}>
          <div className="flex row al-ce">
            <span className={styles.fn}>{firstName}</span>
            <div className={styles.sn}>{lastName}</div>
          </div>
          <div className="flex row al-ce">
            <img className={styles.fileIcon} src={FileIcon} alt="file" />
            <a
              target="_blank"
              href={"https://etherscan.io/address/" + address}
              className={styles.seeContract}
            >
              see the contract
            </a>
          </div>
        </div>
      </div>

      {!hideScore ? <Score score={score} /> : null}
    </div>
  );
}
