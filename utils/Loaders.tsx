const Loaders = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 animate-pulse">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* Text */}
        <div className="ml-4 text-white font-bold text-xl animate-pulse">
          
        </div>
      </div>
    );
  };
  
  export default Loaders;
  