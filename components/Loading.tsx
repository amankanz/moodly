import React from "react";
import { ImSpinner } from "react-icons/im";

function Loading() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      {/* <i className="fa-solid fa-spinner animate-spin text-4xl sm:text-5xl text-red-400"></i> */}
      <ImSpinner className="fa-solid fa-spinner animate-spin text-4xl sm:text-5xl text-red-400" />
    </div>
  );
}

export default Loading;
