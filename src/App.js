import { useState } from "react";
import "./App.css";
import Content from "./components/Content";
import MobDrawer from "./components/MobDrawer";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import Loader from "./components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import MusicModal from "./components/MusicModal";
import useSound from "use-sound";
import Audio from "./assets/audio/bg.aac";
import { useSetRecoilState } from "recoil";
import { isMusicModalOpen } from "./recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import { uuid } from "uuidv4";
import { useWaitForTransaction, useWalletClient, useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import Login from "./pages/Login";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const setVisible = useSetRecoilState(isMusicModalOpen);
  const [play, { pause }] = useSound(Audio, {
    loop: true,
    onload: () => {
      setLoading(false);
    },
  });
  const location = useLocation();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  // const [loggedIn, updateLoggedIn] = useRecoilState(isUserLoggedIn);

  const loggedIn = localStorage.getItem("token");

  const { isConnected, address } = useAccount();
  const { data: signer } = useWalletClient();
  const { open, close } = useWeb3Modal();

  const isComingSoonPage = location.pathname === "/coming-soon";

  const onLoginAttempt = async () => {
    const nonce = uuid();
    const message = `Login to the Pepe Analtics Dashboard\n\nNonce: ${nonce}`;
    try {
      const signature = await signer.signMessage({
        account: address,
        message: message,
      });

      const { data } = await axios.post(
        "https://api.pepeanalytics.com/v1/login",
        {
          nonce,
          message,
          signature,
          address,
        }
      );

      if (data.data.holder) {
        localStorage.setItem("token", JSON.stringify(data.data));
        setIsLoggingIn(false);
      } else {
        toast.error("You do not have enough PepeAI Tokens");
      }
    } catch (e) {
      console.log(e);
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    let pop_status = localStorage.getItem("pop_status");
    if (!pop_status) {
      setVisible(true);
      localStorage.setItem("pop_status", 1);
    }
  }, [setVisible]);

  if (!loggedIn) {
    return (
      <>
        <ToastContainer />
        {isConnected ? (
          <Login
            buttonText={"Login"}
            handleClick={() => {
              setIsLoggingIn(true);
              onLoginAttempt();
            }}
          />
        ) : (
          <Login
            buttonText={"Connect"}
            handleClick={() => {
              open({});
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }}>
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        {/* <div className={`bg ${isComingSoonPage ? "coming-soon-bg" : ""}`} /> */}
        {/* <div className="blur" /> */}

        <Sidebar />
        <Content />
        <MobDrawer />
        <MusicModal play={play} pause={pause} />
      </div>
    </>
  );
}

export default App;
