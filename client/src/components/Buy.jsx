import * as ethers from "ethers";

const Buy = ({ state }) => {
  const buychai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.parseEther("0.001") };
    const transaction = await contract.buychai(name, message, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-1">Send a Chai ☕</h2>
      <p className="text-amber-600 text-sm mb-6">Support with 0.001 ETH and leave a message</p>

      <form onSubmit={buychai} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-amber-800 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g. Riya"
            className="w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-amber-800 mb-1">
            Message
          </label>
          <input
            type="text"
            id="message"
            placeholder="Keep up the great work!"
            className="w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>

        <button
          type="submit"
          disabled={!state.contract}
          className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 transition duration-200 shadow-sm"
        >
          Pay 0.001 ETH ☕
        </button>
      </form>
    </div>
  );
};

export default Buy;