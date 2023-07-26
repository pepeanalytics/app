import React, { useState } from "react";
import styles from "../../styles/Main.module.css";
import { ArrowLeft } from "../../assets/Svg";
import Button from "../Button";
import { useMediaQuery } from "react-responsive";
import { shortenWalletAddress } from "../../utils/shortenWallet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function ContractsGrid() {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [hidden, setHidden] = useState(true);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["/dashboard/home"],
  });

  const newContracts = data ? data.contractsDeployed : [];
  const displayContracts = hidden ? newContracts?.slice(0, 5) : newContracts;

  return (
    <div className={styles.contractsGrid}>
      <div className={styles.coinsHeadersGrid}>
        <div>coin adress</div>
        <div className={styles.launched}>launched</div>
      </div>

      <div className={styles.coinsGridContent}>
        {displayContracts?.map((contract) => {
          return (
            <div className={styles.coinsValuesGrid} key={contract.address}>
              <a
                className={styles.address}
                href={"https://etherscan.io/address/" + contract.address}
                target="_blank"
              >
                {!isMobile
                  ? contract.address
                  : shortenWalletAddress(contract.address)}
              </a>
              <div className={styles.launched}>10 mins ago</div>
            </div>
          );
        })}

        {hidden ? <div className={styles.blur}></div> : null}

        <div
          className={`${styles.center} ${
            hidden ? styles.seeFullListButton : styles.hideBtn
          }`}
        >
          <Button
            variant="primary"
            onClick={() => {
              setHidden((prev) => !prev);
            }}
          >
            <span className={styles.seeFullList}>
              {hidden ? "see full list" : "hide full list"}
              <ArrowLeft />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
