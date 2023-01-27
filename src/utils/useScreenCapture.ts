/*
 * Custom hook to interact with the Media Recorder API
 * Author: @rafaelsilva81
 */

import { useEffect, useState } from "react";

export default function useRecorder() {
  const [isRecording, setisRecording] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [videoData, setVideoData] = useState<string>();

  useEffect(() => {
    if (mediaRecorder && isSupported) {
      mediaRecorder.addEventListener("dataavailable", (e) => {
        const uri = URL.createObjectURL(e.data);
        setVideoData(uri);
      });

      mediaRecorder.addEventListener("stop", () => {
        setMediaRecorder(null);
        setisRecording(false);
      });
    }
  }, [mediaRecorder, isRecording]);

  useEffect(() => {
    if (navigator.mediaDevices) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  });

  const starRecording = async () => {
    if (!isRecording && navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();
      setisRecording(true);
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setisRecording(false);
    }
  };

  return { isRecording, isSupported, starRecording, stopRecording, videoData };
}
