"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext<
  | { movieAmount: number | null; setMovieAmount: (val: number) => void }
  | undefined
>(undefined);

export default function ContextHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movieAmount, setMovieAmount] = useState<number | null>(null);

  return (
    <Context.Provider value={{ movieAmount, setMovieAmount }}>
      {children}
    </Context.Provider>
  );
}

export const useContextValues = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useContextValues must be used within a ContextHolder");
  return context;
};
