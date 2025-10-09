import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import videoBg from "../../assets/v3.mp4";
import contractAbi from "../../contractAbi.json";
import erc20Abi from "../../erc20Abi.json";
import useEthers from "../../hooks/useEthers";
import { ethers, formatUnits } from "ethers";
import { useNotification } from "../../hooks/useNotification";
import { useParams } from "react-router";

function Hero({ showModal }) {
  const [dataBox, setDataBox] = useState([
    { name: "1 Day", clicked: true, percentage: 0.4, planId: 1 },
    { name: "7 Day", clicked: false, percentage: 4, planId: 2 },
    { name: "14 Day", clicked: false, percentage: 9.5, planId: 3 },
    { name: "28 Day", clicked: false, percentage: 24, planId: 4 },
  ]);

  const { ref } = useParams();

  const [amount, setAmount] = useState(0);
  const [selectedBox, setSelectedBox] = useState(dataBox[0]);
  const [usdtValue, setUsdtValue] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const { showSuccess, showError } = useNotification();

  const isConnected = useSelector((state) => state.user.isConnected);
  const walletAddress = useSelector((state) => state.user.walletAddress);
  const USDTAddress = useSelector((state) => state.user.USDTAddress);
  const contractAddress = useSelector((state) => state.user.contractAddress);
  const companyWalletAddress = useSelector(
    (state) => state.user.companyWalletAddress
  );

  const { signer } = useEthers();

  useEffect(() => {
    const circulationAmount =
      parseFloat(amount) + (amount * selectedBox.percentage) / 100;
    setUsdtValue(circulationAmount);
  }, [amount, selectedBox]);

  useEffect(() => {
    const getPrice = async () => {
      try {
        setBalanceLoading(true);
        const provider = new ethers.JsonRpcProvider(
          "https://rpc.anghscan.org/"
        );

        // console.log(provider);
        const contract = new ethers.Contract(USDTAddress, erc20Abi, provider);

        const balance = await contract.balanceOf(walletAddress);
        const decimals = await contract.decimals();

        const formatted = formatUnits(balance, decimals);
        setUsdtBalance(formatted);
      } catch (error) {
        console.log(error);
        showError("Something went wrong while fetching the balance.");
      } finally {
        setBalanceLoading(false);
      }
    };

    isConnected && getPrice();
  }, [isConnected]);

  const handleClick = (index) => {
    const newData = dataBox.map((item, i) => ({
      ...item,
      clicked: i === index,
    }));
    setDataBox(newData);
    setSelectedBox(dataBox[index]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleSubmit = async () => {
    try {
      if (amount < 1) {
        showError("Amount Is Less Than 1!");
        return;
      }

      const refrealAddress = ref ? ref : companyWalletAddress;

      if (!ethers.isAddress(refrealAddress)) {
        showError("Wrong Referal Link Or Address!");
        return;
      }

      const tokenContract = new ethers.Contract(USDTAddress, erc20Abi, signer);

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      showSuccess("Transaction Successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col gap-7 items-center justify-center overflow-hidden px-2">
      {/* 🎥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional overlay for contrast */}
      {/* <div className="absolute inset-0 bg-black/40 -z-10"></div> */}

      {/* 🔹 Your existing content */}
      <div className="flex font-bold text-3xl items-center gap-2 z-0">
        <div className="w-15 h-15 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="90" fill="#00BFFF" />
            <polygon
              points="100,30 65,100 115,100 70,170 130,105 85,105"
              fill="#00FFFF"
            />
          </svg>
        </div>

        <span className="bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] text-transparent bg-clip-text">
          ANGHLoop
        </span>

        {/* <span className="bg-gradient-to-r border-2 border-[#00BFFF] px-3 rounded-lg from-[#00BFFF] to-[#00FFFF] text-transparent bg-clip-text">
          Loop
        </span> */}
      </div>

      {/* 🔹 Card */}
      <div className="bg-slate-700/90 backdrop-blur-sm rounded-xl px-3 py-5 w-full max-w-md shadow-lg">
        <span className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#00FFFF] text-transparent bg-clip-text">
          Circulation
        </span>

        <div>
          <div className="flex justify-between mt-3">
            <span className="font-semibold">Amount</span>
            <span>
              <span className="text-gray-400">Balance</span>{" "}
              {balanceLoading ? "0.0000" : parseFloat(usdtBalance).toFixed(4)} -
              USDT
            </span>
          </div>

          <div className="bg-slate-600 focus-within:bg-gradient-to-tr focus-within:from-[#00BFFF] focus-within:to-[#00FFFF] p-1 mt-2 rounded-xl">
            <div className="flex gap-2 px-2 bg-slate-600 rounded-lg items-center">
              <input
                value={amount}
                onChange={handleInputChange}
                className="flex-1 border-none py-2.5 focus:outline-none text-lg focus:text-[#00FFFF] font-semibold bg-transparent"
                type="number"
                placeholder="Enter Amount"
              />
              <button onClick={() => {
                let floored = Math.floor(parseFloat(usdtBalance) * 10000) / 10000;
                setAmount(floored.toFixed(4));
              }} className="bg-white h-fit text-black px-2 rounded cursor-pointer hover:bg-white/70 transition ease-in-out duration-300">
                Max
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mt-3">
            <span className="font-semibold">Duration</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {dataBox.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`p-1 ${item.clicked
                  ? "bg-gradient-to-tr from-[#00BFFF] to-[#00FFFF]"
                  : "bg-slate-500"
                  } cursor-pointer rounded-full`}
              >
                <div
                  className={`px-3 py-2 font-semibold rounded-full text-center ${!item.clicked && "bg-slate-500"
                    }`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-1">
          <div className="flex justify-between mt-3">
            {dataBox.map(
              (item, index) =>
                item.clicked && (
                  <span key={index} className="font-semibold">
                    {item.name}
                  </span>
                )
            )}
            <span>
              <span className="text-gray-400 font-bold">
                ~{parseFloat(usdtValue).toFixed(4)}
              </span>{" "}
              - USDT
            </span>
          </div>
          {isConnected ? (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-tr from-[#00BFFF] to-[#00FFFF] mt-3 w-full py-2 rounded-full font-bold text-black/80 
               cursor-pointer hover:scale-103 hover:-translate-y-0.5 transition ease-in-out duration-200"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => {
                showModal(true);
              }}
              className="bg-gradient-to-tr from-[#00BFFF] to-[#00FFFF] mt-3 w-full py-2 rounded-full font-bold text-black/90 
               cursor-pointer hover:scale-103 hover:-translate-y-0.5 transition ease-in-out duration-200"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
