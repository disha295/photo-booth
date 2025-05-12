export default function PhotoBoothModel() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      <div className="relative w-80 h-[32rem] bg-white rounded-xl shadow-lg border border-gray-400 overflow-hidden">
        {/* Top Label */}
        <div className="bg-blue-600 text-white text-center text-xl font-bold py-2">
          PHOTO BOOTH
        </div>

        {/* Camera View */}
        <div className="absolute top-16 left-5 w-36 h-60 bg-gray-800 rounded shadow-inner z-10" />

        {/* Side Screen */}
        <div className="absolute top-16 right-5 w-24 h-32 bg-blue-200 border border-blue-500 rounded-md flex items-center justify-center text-xs text-blue-700 font-semibold z-20">
          Screen
        </div>

        {/* Enter Button */}
        <button className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-pink-500 text-white text-sm rounded-full z-30 shadow-md hover:bg-pink-600 transition">
          Enter
        </button>

        {/* Print Slot */}
        <div className="absolute bottom-4 right-5 w-24 h-6 bg-gray-300 rounded-sm flex items-center justify-center text-[10px] text-black z-20">
          Prints Here
        </div>
      </div>
    </div>
  );
}
