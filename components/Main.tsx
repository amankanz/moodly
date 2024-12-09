import React, { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="flex-1 flex flex-col p-4">{children}</main>;
}

export default Main;
