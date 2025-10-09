import { FaCircleChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router";

function SavingBox() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="max-w-lg rounded-3xl p-0.5 w-full bg-gradient-to-tr from-[#0afcb3] via-[#0891e0] to-[#08e7d5]">
        <div className="bg-black p-5 rounded-3xl flex flex-col gap-2">
          <div className="bg-gradient-to-tr text-black from-[#0afcb3] to-[#0891e0] rounded-xl px-5 py-3">
            <div>Total Amount</div>
            <div className="text-4xl font-extrabold flex gap-5 items-center">
              0 USDT{" "}
              <FaCircleChevronRight
                onClick={() => navigate("/saving/total")}
                className="text-2xl cursor-pointer"
              />
            </div>
            <div className="h-[1px] my-3 bg-black"></div>
            <div className="flex">
              <div className="flex-1">
                <div className="text-sm">Yesterday's Earnings</div>
                <div className="font-extrabold text-xl">0 USDT</div>
              </div>
              <div className="flex-1">
                <div className="text-sm flex gap-2 items-center">
                  Total Earnings{" "}
                </div>
                <div className="font-extrabold text-xl">0 USDT </div>
              </div>
            </div>
          </div>
          <div className=" py-5">
            <div className="flex justify-center gap-1">
              <button
                onClick={() => console.log("Saving")}
                className="font-bold text-xl cursor-pointer hover:scale-103 transition ease-in-out duration-300 bg-gradient-to-tr text-black from-[#0afcb3] to-[#0891e0] w-5/12 md:w-2/5 py-2 rounded-full"
              >
                Saving
              </button>
              <button
                onClick={() => console.log("Withdraw")}
                className="font-bold text-xl cursor-pointer hover:scale-103 transition ease-in-out duration-300 bg-gradient-to-tr text-black from-[#0afcb3] to-[#0891e0] w-5/12 md:w-2/5 py-2 rounded-full"
              >
                Withdraw
              </button>
            </div>
            <div className="flex flex-col mt-3 gap-3 items-center">
              <button className="border-2 py-2 rounded-2xl font-bold text-xl w-10/12 md:w-4/5 cursor-pointer text-gray-300 hover:bg-gray-300 hover:text-black transition ease-in-out duration-300">
                Claim Rewards
              </button>
              <button className="border-2 py-2 rounded-2xl font-bold text-xl w-10/12 md:w-4/5 cursor-pointer text-gray-300 hover:bg-gray-300 hover:text-black transition ease-in-out duration-300">
                Orders
              </button>
              <button className="border-2 py-2 rounded-2xl font-bold text-xl w-10/12 md:w-4/5 cursor-pointer text-gray-300 hover:bg-gray-300 hover:text-black transition ease-in-out duration-300">
                Withdrawl Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingBox;
