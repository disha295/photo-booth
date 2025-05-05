import { useEffect, useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    // Access webcam when component mounts
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
          setIsCameraReady(true);
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });

    // Cleanup function: stop webcam when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-72 h-96 bg-black overflow-hidden rounded-lg shadow-lg">
        <video
          ref={videoRef}
          className="w-full h-full object-cover filter grayscale"
          autoPlay
          playsInline
        />
      </div>

      {!isCameraReady && (
        <p className="text-center text-gray-400 mt-2">Loading camera...</p>
      )}
    </div>
  );
};

export default CameraCapture;
