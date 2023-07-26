import React, { useState } from "react";
import styles from "../../styles/Analysis.module.css";
import { AccordionContentHeader } from "./../AccordionSection";
import OthersToken from "./OthersToken";
import History from "./History";
import HoldersAccordion from "../HoldersAccordion";
import UniversalLoader from "./../../components/UniversalLoader";
import { useQuery } from "@tanstack/react-query";

export default function TopHolderItem({
  holderAddress = "",
  amount = "",
  index = 0,
}) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`/address/${holderAddress}?include_history=true`],
    enabled: holderAddress.length > 0 && open,
  });

  return (
    <HoldersAccordion
      isOpen={open}
      setIsOpen={setOpen}
      black
      genClass={styles.accordionSection}
      openClass={styles.accordionSectionOpen}
      title={
        <AccordionContentHeader
          index={index}
          holderAddress={holderAddress}
          holderAmount={amount}
          link={"https://etherscan.io/address/" + holderAddress}
        />
      }
    >
      {isError ? (
        <div className={styles.error}>Error occured while fetching</div>
      ) : null}
      {isLoading && !isError ? (
        <UniversalLoader />
      ) : (
        <>
          <OthersToken tokens={data?.tokens || []} />
          <History
            time={"LAST 24H"}
            history={data?.history || []}
            address={holderAddress}
          />
        </>
      )}
    </HoldersAccordion>
  );
}
