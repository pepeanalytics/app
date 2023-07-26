import React, { useEffect, useState } from "react";
import styles from "../styles/Analysis.module.css";
import HomeHeader from "../components/HomeHeader";
import MobNavbar from "../components/MobNavbar";
import InfoRow from "../components/HoldersInfo/InfoRow";
import errorStyle from "../styles/Analysis.module.css";
import Tab from "../components/Tabs";
import ConditionalDisplay from "../components/ConditionalDisplay";
import HolderAnalysis from "./HolderAnalysis";
import DeployerData from "./DeployerData";
import Search from "../components/Search.jsx";
import Breadcrumbs from "../components/Breadcrumbs";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import Back from "../components/Back";
import { analysisAddressState } from "../recoil/search";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import UniversalLoader from "../components/UniversalLoader";
import {
  analysisBreadCrumb,
  analysisHoneyPotBreadCrumb,
  homeBreadCrumb,
} from "../utils/breadCrumbConsts";

const TABS = ["holders analysis", "deployer data"];

const path = [homeBreadCrumb, analysisHoneyPotBreadCrumb, analysisBreadCrumb];

export default function Analysis() {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const addressQuery = queryParams.get("address");
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [addressSearch, setAddressSearch] =
    useRecoilState(analysisAddressState);
  const [currentAddress, setCurrentAddress] = useState(addressQuery);

  const {
    data: tokenData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`/token/${currentAddress}?history=day&include_holders=true`],
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
      navigate(`/analysis?address=${addressSearch}`);
    }
  };

  if (isError)
    return (
      <div className={errorStyle.error}>
        An error occured while completeing this request.
      </div>
    );

  return (
    <>
      <HomeHeader />
      <MobNavbar />
      <div className={styles.container}>
        <div className={`flex sb al-ce back-component`}>
          <Back path={"/search-analysis"} />
          {!isMobile && <Breadcrumbs path={path} />}
        </div>
        <div className={styles.analysisHeader}>
          deployer and holders analysis
        </div>
        <Search
          search={addressSearch}
          setSearch={handleSearchChange}
          placeholder={"0x000000"}
          onSearchClick={handleSearch}
        />
        {isLoading ? (
          <UniversalLoader />
        ) : (
          <>
            <div className={`flex jc`}>
              <InfoRow
                hideScore
                firstName={tokenData?.name || "NOT FOUND"}
                lastName={tokenData?.symbol || "N/A"}
                imgLink={tokenData?.logo}
                address={tokenData?.address || ""}
              />
            </div>
            <Tab
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <ConditionalDisplay condition={activeTab === TABS[0]}>
              <HolderAnalysis tokenData={tokenData} />
            </ConditionalDisplay>
            <ConditionalDisplay condition={activeTab === TABS[1]}>
              <DeployerData deployerAddress={tokenData?.deployer} />
            </ConditionalDisplay>
          </>
        )}
      </div>
    </>
  );
}
