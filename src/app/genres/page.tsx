import Genres from "@/components/Genres/Genres";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense>
      <Genres />
    </Suspense>
  );
} 
