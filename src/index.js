import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { goerli, mainnet } from "wagmi/chains";
import { WALLET_CONNECT_ID } from "./consts";
import web3Config from "./web3.config";
import jwtDecode from "jwt-decode";
import refreshAuthToken from "./utils/refreshAuthToken";

// Default query function

const defaultQueryFn = async ({ queryKey }) => {
  const authToken = JSON.parse(localStorage.getItem("token"));

  let accessToken = authToken.accessToken;
  let refreshToken = authToken.refreshToken;

  const { exp } = jwtDecode(accessToken);

  try {
    if (Date.now() > exp * 1000) {
      const { data: refreshData } = await refreshAuthToken({ refreshToken });
      localStorage.setItem("token", JSON.stringify(refreshData.data));
      accessToken = refreshData.data.accessToken;
    }

    const { data } = await axios.get(
      `https://api.pepeanalytics.com/v1${queryKey[0]}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (data.isError) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (e) {
    const statusCode = e?.response?.status;

    // log this user out auth tokens are not longer working

    if (statusCode === 403) {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      throw e;
    }
  }
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const chains = [web3Config.chain];
const projectId = WALLET_CONNECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </BrowserRouter>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
