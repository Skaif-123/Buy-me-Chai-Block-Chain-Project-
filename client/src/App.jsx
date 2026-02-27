import * as ethers from "ethers";
import { useEffect, useState } from "react";
import abi from "./../../artifacts/contracts/Chai.sol/chai.json";
import chai from "./chai.jpg";
import Buy from "./components/Buy.jsx";
import Memos from "./components/Memos.jsx";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x9A6e0FB854B55AfC8605859624098A46bb92F817";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) { alert("Please install MetaMask"); return; }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setState({ provider, signer, contract });
        ethereum.on("chainChanged", () => window.location.reload());
        ethereum.on("accountsChanged", () => window.location.reload());
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 font-serif">
      {/* Hero Banner */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src={chai} className="w-full h-full object-cover" alt="Chai" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 to-amber-950/70 flex items-end pb-5 pl-6">
          <h1 className="text-4xl font-bold text-amber-100 tracking-tight drop-shadow-lg">
            ☕ Buy Me a Chai
          </h1>
        </div>
      </div>

      {/* Wallet Badge */}
      <div className="flex justify-end px-6 py-3">
        <span className="inline-flex items-center gap-2 bg-white border border-amber-200 text-amber-800 text-xs font-mono rounded-full px-4 py-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {account === "None" ? "Not connected" : `${account.slice(0, 6)}…${account.slice(-4)}`}
        </span>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 pb-16 space-y-10">
        <Buy state={state} />
        <Memos state={state} />
      </main>
    </div>
  );
}

export default App;