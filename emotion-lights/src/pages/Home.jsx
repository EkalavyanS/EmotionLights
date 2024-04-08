import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDatabase, ref, set } from "firebase/database";

function WebcamPhotoCapture() {
  const [mediaStream, setMediaStream] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [currentEMotion, setCurrentEMotion] = useState();
  const EMCOLORS = {
    Happy: "Blue",
    Disgust: "Yellow",
    Sad: "Green",
    Anger: "Red",
    Nervous: "White",
  };

  useEffect(() => {
    const constraints = {
      audio: false,
      video: {
        facingMode: "environment", // Use the rear camera if available
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setMediaStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    const capturePhoto = () => {
      const video = document.querySelector("video"); // Define video element here
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        setPhotoBlob(blob);
        sendPhoto(blob); // Send the photo using Axios
      }, "image/jpeg");
    };

    const intervalId = setInterval(() => {
      capturePhoto();
    }, 10 * 1000); // Capture photo every 10 seconds

    return () => clearInterval(intervalId);
  }, [mediaStream]);

  const sendPhoto = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);

      const response = await axios.post(
        "http://localhost:8902/emotion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Photo sent successfully:", response.data);
      var res = response.data;
      console.log(EMCOLORS[response.data]);
      setCurrentEMotion(response.data);
      const db = getDatabase();
      set(ref(db, "/color"), EMCOLORS[response.data]);
    } catch (error) {
      console.error("Error sending photo:", EMCOLORS[response.data]);
    }
  };

  return (
    <div>
      {mediaStream ? (
        <>
          <video
            ref={(video) => {
              if (video) {
                video.srcObject = mediaStream;
                video.play();
              }
            }}
          />
          {photoBlob && (
            <img
              src={URL.createObjectURL(photoBlob)}
              alt="Captured Photo"
              style={{ maxWidth: "100%" }}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <h1>Current emotion {currentEMotion}</h1>
    </div>
  );
}

export default WebcamPhotoCapture;
