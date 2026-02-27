import { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-1">Messages</h2>
      <p className="text-amber-600 text-sm mb-6">{memos.length} chai{memos.length !== 1 ? "s" : ""} received</p>

      {memos.length === 0 ? (
        <p className="text-center text-amber-300 py-10 text-sm italic">No messages yet — be the first! ☕</p>
      ) : (
        <div className="space-y-4">
          {memos.map((memo) => (
            <div
              key={Math.random()}
              className="flex gap-4 items-start bg-amber-50 border border-amber-100 rounded-xl p-4"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-sm shrink-0 uppercase">
                {memo.name?.[0] || "?"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-semibold text-amber-900 text-sm">{memo.name}</span>
                  <span className="text-xs text-amber-400 font-mono">
                    {new Date(Number(memo.timestamp * 1000n)).toLocaleString()}
                  </span>
                </div>
                <p className="text-amber-800 text-sm mt-1">{memo.message}</p>
                <p className="text-xs text-amber-400 font-mono mt-1 truncate">{memo.from}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Memos;