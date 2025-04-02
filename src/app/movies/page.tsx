import Movies from "@/components/Movies/Movies";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense>
      <Movies />
    </Suspense>
  ); 
}
