import React from "react";
import Home from "../pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Tos from "../pages/Tos";
import Roadmap from "../pages/Roadmap";
import Congrats from "../pages/Congrats";

import { useContractRead } from "wagmi";
import web3Config from "../web3.config";
import ComingSoon from "../pages/ComingSoon";
import Main from "../pages/Main";
import HoldersTransactions from "../pages/HoldersTransactions";
import Analysis from "../pages/Analysis";
import TokenDetailsPage from "../pages/TokenDetailsPage";
import Destiny from "../pages/Destiny";
import TokenSnifferSearch from "../pages/TokenSnifferSearch";
import AnalysisSearch from "../pages/AnalysisSearch";
import NewCoins from "../pages/NewCoins";
import TokenSniffer from "../pages/TokenSniffer";
import Sniper from "../pages/Sniper";
import SeeMore from "../pages/SeeMore";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Verify from "../pages/Verify";

export default function Content() {
  const { data, isLoading, isError, error } = useContractRead({
    address: web3Config.contractAddress,
    abi: web3Config.abi,
    functionName: "totalSupply",
  });

  const inStock = data && data.toString() !== "520";

  return (
    <div className="content">
      <Routes>
        <Route path="/verify/:code" element={<Verify />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate replace to={"/main"} />} />
        <Route path="/token-sniffer" element={<TokenSniffer />} />
        <Route path="/holders" element={<HoldersTransactions />} />
        {/* <Route path="/token" element={<TokenDetailsPage />} /> */}
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/main" element={<Main />} />
        <Route path="/social" element={<Destiny />} />
        <Route path="/sniper" element={<Sniper />} />
        <Route path="/seemore" element={<SeeMore />} />
        <Route path="/search-token-sniffer" element={<TokenSnifferSearch />} />
        <Route path="/search-analysis" element={<AnalysisSearch />} />
        {/* <Route path="/new" element={<NewCoins />} /> */}
        {/* <Route path="/sold-out" element={<Home soldOut={false} />} /> */}
        {/* NON DASH PAGES */}
        <Route path="/tos" element={<Tos />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/congrats" element={<Congrats />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </div>
  );
}
