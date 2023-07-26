import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isMusicModalOpen,
  isTooltipOpenState,
  musicPlayState,
} from "../recoil";
import Button from "./Button";
import Modal from "./Modal";
import { MusicOn } from "../assets/Svg";

export default function MusicModal({ play, pause }) {
  const [show, setShow] = useRecoilState(isMusicModalOpen);
  const [isPlay, setIsPlay] = useRecoilState(musicPlayState);
  const setTooltipOpen = useSetRecoilState(isTooltipOpenState);

  const handleClose = () => {
    setShow(false);
    setTooltipOpen(true);
  };

  const playMusic = () => {
    setIsPlay(true);
    handleClose();
  };

  const pauseMusic = () => {
    setIsPlay(false);
    handleClose();
  };

  useEffect(() => {
    if (isPlay) {
      play();
    } else {
      pause();
    }
  }, [isPlay, pause, play]);

  return (
    <Modal isOpen={show} onClose={handleClose}>
      <>
        <div className="music-img">
          <img src={require("../assets/images/tunes.png")} alt="music" />
        </div>
        <div className="experience">
          click on the music button to get the full experience, mr. Gambler
        </div>
        <div className="flex row al-ce jc music-btns">
          <Button variant="secondary" onClick={playMusic}>
            <span className="music-btn">
              <MusicOn />
            </span>
          </Button>

          <Button variant="secondary" onClick={pauseMusic}>
            <span className="music-btn">
              <img src={require("../assets/images/musicOff.png")} alt="stop" />
            </span>
          </Button>
        </div>
      </>
    </Modal>
  );
}
