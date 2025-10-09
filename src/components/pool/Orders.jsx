import { useState } from "react";
import { useSelector } from "react-redux";

function Orders() {
  const [data, setData] = useState([]);

  const isConnected = useSelector((state) => state.user.isConnected);

  return (
    <div className="py-7">
      <div className="flex justify-center items-center gap-2">
        <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] text-transparent bg-clip-text">
          Orders
        </span>
        <button
          onClick={() => console.log("Refreshed Clicked!")}
          className="border px-2 rounded-lg cursor-pointer text-sm text-[#00BFFF]"
        >
          Refresh
        </button>
      </div>
      {!isConnected ? (
        <div className="mt-5 flex items-center justify-center h-30 text-gray-300">
          Connect To Wallet
        </div>
      ) : data.length == 0 ? (
        <div className="mt-5 flex items-center justify-center h-30 text-gray-300">
          No Data Found
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-center h-30 text-gray-300">
          Data Found
        </div>
      )}
      {/* {data.length == 0 && (
        <div className="mt-5 flex items-center justify-center h-30 text-gray-300">
          No Data Found
        </div>
      )} */}
    </div>
  );
}

export default Orders;
