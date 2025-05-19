import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotoBoothModel() {
  const [curtainOpen, setCurtainOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-blue-100 font-sans">
      {/* Header */}
      <h1 className="mt-8 text-3xl font-bold text-pink-500 drop-shadow-[0_1px_3px_rgba(255,0,122,0.5)]">
        Photo Booth
      </h1>

      {/* Main Booth */}
      <div className="flex w-[22rem] h-[32rem] border border-pink-400 bg-pink-50">
        {/* Left Side */}
        <div className="flex flex-col justify-between w-1/2 bg-pink-100 p-4">
          {/* Top: Screen */}
          <div className="flex flex-col items-center justify-center h-40 bg-white rounded-md border-2 border-pink-500 shadow-sm text-center">
            <span className="text-sm text-pink-700 font-semibold">
              CAPTURING
            </span>
            <span className="text-xs text-pink-600">THE MOMENT</span>
          </div>

          {/* Start Button */}
          <button
            onClick={() => setCurtainOpen(true)}
            className="border border-pink-400 py-2 px-4 flex items-center justify-center gap-2 text-sm text-pink-700 hover:bg-pink-200 transition rounded-md"
          >
            <span className="w-2 h-2 bg-pink-400 rounded-full" />
            start
          </button>
        </div>

        {/* Right Side: Curtain and Legs */}
        <div className="w-1/2 relative flex items-end justify-center overflow-hidden">
          {/* Moving Curtain with Realistic Waves */}
          {!curtainOpen && (
            <motion.div
              initial="closed"
              animate="open"
              variants={{
                closed: {},
                open: {},
              }}
              className="absolute top-0 left-0 w-full h-full flex z-10"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full w-[75%] bg-pink-200 border-l border-pink-300"
                  initial={{ x: 0 }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.08, // wave delay
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Legs Illustration (Placeholder) */}
          <div className="absolute bottom-4 text-pink-400 text-6xl opacity-70"></div>
        </div>
      </div>

      {/* Print Area */}
      <div className="w-full h-20 bg-[url('/checkerboard.png')] bg-cover bg-center" />
    </div>
  );
}
