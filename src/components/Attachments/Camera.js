import React, { useEffect, useRef } from "react";
import Icon from "../Icon/Icon";
import styles from "./styles.module.css";

const Camera = ({ onPictureTaken = (f) => f, closeCamera = (f) => f }) => {
  // refs
  const canvasRef = useRef();
  const streamObject = useRef();

  // functions
  const startVideo = () => {
    if (
      navigator &&
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" }, audio: false })
        .then((stream) => {
          let video = document.getElementById("video_container");
          if (video) {
            streamObject.current = stream;
            video.srcObject = stream;
          }
        })
        .catch((err) => {
          stopVideo();
        });
    }
  };

  const stopVideo = () => {
    streamObject.current.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const takePicture = () => {
    let canvas = document.getElementById("camera_canvas");
    if (canvas) {
      let context = canvas.getContext("2d");
      let video = document.getElementById("video_container");
      canvas.width = 500;
      canvas.height = 500;
      context.drawImage(video, 0, 0, 500, 500);

      canvas.toBlob(onPictureTaken, "image/jpg", 0.7);
    }
  };

  // effects
  useEffect(() => {
    startVideo();
    return () => {
      stopVideo();
    };
  }, []);

  // renders
  const renderTakePictureButton = () => {
    return (
      <button
        className={styles.takePictureButton}
        onClick={takePicture}
      ></button>
    );
  };

  const renderCloseCameraButton = () => {
    return (
      <button className={styles.closeButton} onClick={closeCamera}>
        <Icon name="times" />
      </button>
    );
  };
  return (
    <>
      <section className={styles.cameraWrapper}>
        <video id="video_container" muted autoPlay></video>

        {renderTakePictureButton()}
        {renderCloseCameraButton()}
      </section>

      <canvas
        ref={canvasRef}
        id="camera_canvas"
        style={{ display: "none" }}
      ></canvas>
    </>
  );
};

export default Camera;
