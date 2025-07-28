import React, { useState } from "react";
type props = {
  children: React.ReactNode;
};
export default function Main({ children }: props) {
  const [close, setClose] = useState<boolean>(false);
  return (
    <main
      className={`bg-slate-700 w-[84%] sm:w-1/3  rounded-md relative mb-4 border-spacing-2 transition-all duration-300 overflow-y-auto  sm:min-h-[700px] max-h-[80vh] md:h-full scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 ${
        close
          ? "h-5 bg-transparent"
          : "max-h-[80vh] sm:max-h-[700px] min-h-[80vh]"
      }`}
    >
      <button
        className="button absolute top-2 right-2 w-4 h-4 text-white bg-slate-800 rounded-full flex justify-center items-center "
        onClick={() => setClose((prev) => !prev)}
      >
        <span className="mt-[-3px] font-light text-sm">
          {close ? "+" : "\u2212"}
        </span>
      </button>
      {!close && children}
    </main>
  );
}
