import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Orders({ tableData }) {
  const isConnected = useSelector((state) => state.user.isConnected);

  console.log(tableData);

  return (
    <div className="py-10 px-2">
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
      ) : tableData.length == 0 ? (
        <div className="mt-5 flex items-center justify-center h-30 text-gray-300">
          No Data Found
        </div>
      ) : (
        <div className="overflow-x-auto max-w-7xl mx-auto mt-10">
          <table className="table overflow-hidden">
            {/* head */}
            <thead className="text-white bg-gradient-to-tl md:text-lg from-[#0afcb3] to-[#0891e0]">
              <tr>
                <th className="text-center">S.No.</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Reward</th>
                <th className="text-center">Timestamp</th>
                <th className="text-center">User</th>
                <th className="text-center">Withdrawn</th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-tl from-[#0afcb3] to-[#0891e0] md:text-lg ">
              {tableData.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <td className="text-center">${item.amount}</td>
                    <td className="text-center">{item.reward}</td>
                    <td className="text-center">
                      {new Date(Number(item.timestamp) * 1000).toLocaleString()}
                    </td>
                    <td className="flex gap-3 items-center justify-center">
                      {item.user.slice(0, 5) + "..." + item.user.slice(-5)}
                      <ExternalLink
                        size={14}
                        onClick={() =>
                          window.open(
                            `https://anghscan.org/address/${item.user}`,
                            "_"
                          )
                        }
                        className="hover:text-gray-600 transition ease-in-out duration-300 cursor-pointer"
                      />
                    </td>
                    <td className="text-center">{item.withdrawn ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
