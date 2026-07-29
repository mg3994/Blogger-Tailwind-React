import React, { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
      <h2 className="text-xl font-bold text-blue-900">Embedded React App 🚀</h2>
      <p className="text-blue-700 mt-1">This component is bundled into Blogger CDATA.</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Clicks: {count}
      </button>
    </div>
  );
};
