import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import { useMediaQuery } from "react-responsive";
import { format as formatTimeago } from "timeago.js";

import styles from "../styles/HoldersInfo.module.css";
import errorStyle from "../styles/Analysis.module.css";
import InfoRow from "../components/HoldersInfo/InfoRow";

import pinkTick from "../assets/images/pinkTick.png";
import minusBullet from "../assets/images/minusBullet.png";
import { shortenWalletAddress } from "../utils/shortenWallet";
import Search from "../components/Search";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../components/Breadcrumbs";
import Back from "../components/Back";
import { useRecoilState } from "recoil";
import { tokenSnifferAddressState } from "../recoil/search";
import { useNavigate, useSearchParams } from "react-router-dom";
import UniversalLoader from "../components/UniversalLoader";
import {
  homeBreadCrumb,
  tokenSnifferBreadCrumb,
  tokenSniffersHoneyPotBreadCrumb,
} from "../utils/breadCrumbConsts";

const path = [
  homeBreadCrumb,
  tokenSniffersHoneyPotBreadCrumb,
  tokenSnifferBreadCrumb,
];

export default function TokenSniffer() {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const addressQuery = queryParams.get("address");
  const [addressSearch, setAddressSearch] = useRecoilState(
    tokenSnifferAddressState
  );
  const [currentAddress, setCurrentAddress] = useState(addressQuery);

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [`/token/${currentAddress}?history=day`],
  });

  useEffect(() => {
    if (addressQuery) {
      setCurrentAddress(addressQuery);
      setAddressSearch(addressQuery);
    }
  }, [addressQuery]);

  const handleSearchChange = (e) => {
    setAddressSearch(e.target.value);
  };

  const handleSearch = () => {
    if (addressSearch) {
      navigate(`/token-sniffer?address=${addressSearch}`);
    }
  };
  const [swapAnalysisConditions, setSwapConditions] = useState([]);
  const [contractAnalysisConditions, setContractConditions] = useState([]);
  const [holderAnalysisConditions, setHolderConditions] = useState([]);
  const [liquidityAnalysisConditions, setLiquidConditions] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      if (data?.analysis?.contract) {
        setSwapConditions([
          data?.analysis?.contract?.isSellable === undefined ||
          data.analysis.contract.isSellable === "N/A"
            ? "N/A"
            : data.analysis.contract.isSellable,
          data?.analysis?.contract?.sellFee === undefined ||
          data.analysis.contract.sellFee === "N/A"
            ? "N/A"
            : data?.analysis?.contract?.sellFee < 5,
          data?.analysis?.contract?.buyFee === undefined ||
          data.analysis.contract.buyFee === "N/A"
            ? "N/A"
            : data?.analysis?.contract?.buyFee < 5,
        ]);
        setContractConditions([
          data?.analysis?.contract?.verifiedSource === undefined ||
          data.analysis.contract.verifiedSource === "N/A"
            ? "N/A"
            : data.analysis.contract.verifiedSource,
          data?.analysis?.contract?.ownershipRenounced === undefined ||
          data.analysis.contract.ownershipRenounced === "N/A"
            ? "N/A"
            : data.analysis.contract.ownershipRenounced,
          data?.analysis?.contract?.hasPause === undefined ||
          data.analysis.contract.hasPause === "N/A"
            ? "N/A"
            : !data.analysis.contract.hasPause,
          data?.analysis?.contract?.hasMint === undefined ||
          data.analysis.contract.hasMint === "N/A"
            ? "N/A"
            : !data.analysis.contract.hasMint,
          data?.analysis?.contract?.hasBlacklist === undefined ||
          data.analysis.contract.hasBlacklist === "N/A"
            ? "N/A"
            : !data.analysis.contract.hasBlacklist,
        ]);
      }
      if (data?.analysis?.holders) {
        setHolderConditions([
          data?.analysis?.holders?.creatorHoldsLittle === undefined ||
          data.analysis.holders.creatorHoldsLittle === "N/A"
            ? "N/A"
            : data.analysis.holders.creatorHoldsLittle,
          data?.analysis?.holders?.othersHoldLittle === undefined ||
          data.analysis.holders.othersHoldLittle === "N/A"
            ? "N/A"
            : data.analysis.holders.othersHoldLittle,
        ]);
      }
    }
  }, [data, isSuccess]);

  return (
    <div className={styles.container}>
      <HomeHeader />
      <MobNavbar />
      <div className={styles.bodyContainer}>
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/search-token-sniffer"} />

          {!isMobile && <Breadcrumbs path={path} />}
        </div>
        <div className={styles.topSection}>
          <span className={styles.hero}>token sniffer</span>
          <span className={styles.subHeader}>honeypot checker</span>
        </div>
        <Search
          search={addressSearch}
          setSearch={handleSearchChange}
          placeholder={"0x000000"}
          onSearchClick={handleSearch}
        />
        <div className={styles.header}>token sniffer</div>

        {isLoading && <UniversalLoader />}
        {isError && (
          <div className={errorStyle.error}>
            An error occurred while completing this request
          </div>
        )}
        {isSuccess && (
          <>
            <InfoRow
              firstName={data?.name || "Not Found"}
              lastName={data?.symbol || "N/A"}
              score={data?.score || 0}
              address={data?.address || ""}
              link
              imgLink={data?.logo}
            />
            <div className={styles.section}>
              <div className={styles.detailsRow}>
                <div className={styles.normalText}>charts</div>
                <div className={styles.charts}>
                  <a
                    href={`https://dexscreener.com/ethereum/${data?.address}`}
                    target="_blank"
                  >
                    DEX Screener
                  </a>
                  <a
                    href={`https://www.dextools.io/app/en/ether/pair-explorer/${data?.address}`}
                    target="_blank"
                  >
                    DEXTools
                  </a>
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.normalText}>deployed</div>
                <div className={styles.normalText}>
                  {new Date(data.createdAt).toLocaleString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}{" "}
                  ({formatTimeago(data.createdAt)})
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.normalText}>address</div>
                <div className={styles.normalText}>
                  {isMobile ? shortenWalletAddress(data.address) : data.address}
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <span className={styles.header}>
                score: {data?.score || "N/A"}/100
              </span>
              <div className={styles.scoreDesc}>
                The audit score is a measure of how well the token meets the
                criteria for safety. Automated scanners like this one are not
                always completely accurate. A token with a high score may still
                have hidden malicious code. The score is not advice and should
                be considered along with other factors. Always do your own
                research and consult multiple sources of information. Results
                are regenerated every 60 minutes.
              </div>
            </div>
            <AnalysisSection
              header="swap analysis"
              conditionList={swapAnalysisConditions}
              analysisList={swapAnalysis}
            />
            <AnalysisSection
              header="contract analysis"
              conditionList={contractAnalysisConditions}
              analysisList={contractAnalysis}
            />
            <AnalysisSection
              header="holder analysis"
              conditionList={holderAnalysisConditions}
              analysisList={holderAnalysis}
            />
          </>
        )}
      </div>
    </div>
  );
}

const AnalysisSection = ({ header, conditionList, analysisList }) => {
  return (
    <>
      {conditionList.filter((e) => e !== "N/A").length > 0 && (
        <div className={styles.section}>
          <span className={styles.header}>{header}</span>
          <div className={styles.subSection}>
            {conditionList.map((condition, i) => (
              <>
                {condition !== "N/A" && (
                  <div key={i} className={styles.bulletRow}>
                    {condition ? (
                      <img
                        className={styles.pinkTick}
                        src={pinkTick}
                        alt="bullet"
                      />
                    ) : (
                      <img
                        className={styles.minusBullet}
                        src={minusBullet}
                        alt="bullet"
                      />
                    )}

                    {!condition && analysisList[i]?.sub ? (
                      <div className="flex col sa">
                        <div className={styles.normalText}>
                          {analysisList[i]?.content}
                        </div>
                        <div className={styles.descText}>
                          {analysisList[i]?.sub}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.normalText}>
                        {analysisList[i]?.content}
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

let swapAnalysis = [
  {
    content: "Token is sellable (not a honeypot) at this time",
  },
  {
    content: "Sell fee is less than 5%",
  },
  {
    content: "Buy fee is less than 5%",
  },
];

let contractAnalysis = [
  {
    content: "verified contract source",
  },
  {
    content: "Ownership renounced or source does not contain an owner contract",
    sub: "The contract contains ownership functionality and ownership is not renounced which may allow the creator or current owner to modify contract behavior. However there can be legitimate reasons for not renouncing ownership.",
  },
  {
    content: "Source does not contain a pausable contract",
    sub: "The source code contains a Pausable contract which could potentially allow transfers to be halted.",
  },
  {
    content: "Source does not contain a mint function",
    sub: "The source code contains a mint function which could potentially allow new tokens to be created and dumped",
  },
  {
    content: "Source does not contain blocklist capability",
    sub: "The source code contains a function which can blocklist holders (honeypot risk)",
  },
];

let holderAnalysis = [
  {
    content:
      "Creator wallet contains less than 5% of circulating token supply (90%)",
    sub: "The creator wallet contains a substantial amount of tokens which could have a large impact on the token price if sold.",
  },
  {
    content:
      "All other holders possess less than 5% of circulating token supply",
    sub: "All other holders possess less than 5% of circulating token supply",
  },
];
