import React from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";

import backStyles from "../styles/Analysis.module.css";
import errorStyle from "../styles/Analysis.module.css";
import styles from "../styles/HoldersTransactions.module.css";
import acordianStyles from "../styles/HoldersTransactions.module.css";
import TransactionRow from "../components/HoldersInfo/TransactionRow";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "../assets/Svg";
import Breadcrumbs from "../components/Breadcrumbs";
import { useMediaQuery } from "react-responsive";
import Back from "../components/Back";
import UniversalLoader from "../components/UniversalLoader";
import {
  destinyBreadCrumb,
  holdersBreadCrumb,
  homeBreadCrumb,
} from "../utils/breadCrumbConsts";
import TopHolderItem from "../components/Analysis/TopHolderItem";
import numeral from "numeral";

const path = [homeBreadCrumb, destinyBreadCrumb, holdersBreadCrumb];

export default function HoldersTransactions() {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["/holders/nft?order=desc"],
  });

  return (
    <div className={styles.container}>
      <HomeHeader />
      <MobNavbar />
      <div className={styles.bodyContainer}>
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/social"} text="Destiny" />

          {!isMobile && <Breadcrumbs path={path} />}
        </div>
        <div className={styles.header}>pepeai holders</div>
        {isLoading && <UniversalLoader />}
        {isError && (
          <div className={errorStyle.error}>
            An error occurred while fetching holders
          </div>
        )}
        {isSuccess && (
          <div className={styles.gridContainer}>
            <div className={styles.headersGrid}>
              <div>No.</div>
              <div>holder adress</div>
              <div>{isMobile ? "" : "Holder Amount"}</div>
              <div></div>
            </div>
            {data?.map((holder, i) => (
              <TopHolderItem
                key={i}
                index={i}
                holderAddress={holder.address}
                amount={
                  holder?.balance < 1000
                    ? String(holder?.balance)
                    : numeral(String(holder?.balance)).format("0.00a")
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
