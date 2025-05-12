import React, { useRef, useState, useEffect } from "react";

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

export default function PhotoBooth() {
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [photoStrip, setPhotoStrip] = useState(null);

  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
    startCamera();
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Grayscale effect
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg =
        (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = avg;
      imageData.data[i + 1] = avg;
      imageData.data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);

    const imageUrl = canvas.toDataURL("image/png");
    setPhotos((prev) => [...prev, imageUrl]);
  };

  const startPhotoSession = async () => {
    setCapturing(true);
    setPhotos([]);
    setPhotoStrip(null);
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j > 0; j--) {
        setCountdown(j);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setCountdown("📸");
      takePhoto();
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCountdown(null);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setCapturing(false);
  };

  const createPhotoStrip = () => {
    const imgElements = photos.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    Promise.all(
      imgElements.map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
          })
      )
    ).then(() => {
      const width = imgElements[0].width;
      const height = imgElements[0].height;
      const padding = 20;
      const canvas = document.createElement("canvas");
      canvas.width = width + padding * 2;
      canvas.height = (height + padding) * imgElements.length + padding;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      imgElements.forEach((img, index) => {
        ctx.drawImage(
          img,
          padding,
          padding + index * (height + padding),
          width,
          height
        );
      });

      const stripDataUrl = canvas.toDataURL("image/png");
      setPhotoStrip(stripDataUrl);
    });
  };

  const downloadPhotoStrip = () => {
    if (!photoStrip) return;
    const link = document.createElement("a");
    link.href = photoStrip;
    link.download = "photo_strip.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="relative w-full max-w-sm">
        <div className="relative z-10">
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg shadow-xl w-full"
          />
          {countdown && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-7xl font-extrabold animate-ping-slow">
                {countdown}
              </div>
            </div>
          )}
        </div>
      </div>

      {!capturing && photos.length === 0 && (
        <button
          onClick={startPhotoSession}
          className="px-8 py-3 bg-pink-500 text-white text-lg rounded-full shadow-md hover:bg-pink-600 transition"
        >
          Start Photo Booth
        </button>
      )}

      {photos.length === 4 && !photoStrip && (
        <button
          onClick={createPhotoStrip}
          className="px-8 py-3 bg-green-500 text-white text-lg rounded-full shadow-md hover:bg-green-600 transition"
        >
          Create Photo Strip
        </button>
      )}

      {photoStrip && (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={photoStrip}
            alt="Photo Strip"
            className="rounded-xl shadow-lg p-2 bg-white"
          />
          <button
            onClick={downloadPhotoStrip}
            className="px-8 py-3 bg-blue-500 text-white text-lg rounded-full shadow-md hover:bg-blue-600 transition"
          >
            Download Photo Strip
          </button>
          {navigator.share && (
            <button
              onClick={() =>
                navigator.share({
                  title: "My Photo Booth Strip",
                  text: "Check out my retro photo booth strip!",
                  files: [dataURLtoFile(photoStrip, "photo_strip.png")],
                })
              }
              className="px-8 py-3 bg-indigo-500 text-white text-lg rounded-full shadow-md hover:bg-indigo-600 transition"
            >
              Share
            </button>
          )}
        </div>
      )}
    </div>
  );
}
