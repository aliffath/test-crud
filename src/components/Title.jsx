import React from "react";
import Link from "next/link";
const Title = ({ titlePage, textButton, href }) => {
  return (
    <>
      <div className="flex gap-5">
        <p className="font-bold text-xl text-slate-900">{titlePage}</p>
        <button className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-1 px-4 rounded-md">
          <Link href={href}>{textButton}</Link>
        </button>
      </div>
    </>
  );
};

export default Title;
