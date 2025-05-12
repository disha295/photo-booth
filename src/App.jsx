import PhotoBoothModel from "./components/PhotoBoothModel";
import PhotoBooth from "./components/PhotoBooth";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {/* Force visible height for each child */}
      <div className="flex items-center justify-center min-h-[30rem] border-4 border-yellow-500">
        <PhotoBoothModel />
      </div>
      <div className="flex items-center justify-center min-h-[30rem] border-4 border-green-500">
        <PhotoBooth />
      </div>
    </div>
  );
}

export default App;
