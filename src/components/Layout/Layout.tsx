"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import ContextHolder from "@/components/ContextHolder/ContextHolder";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const url = usePathname();
  const siteCategory = url.split("/")[1];

  return (
    <>
      <header>
        <Navigation site={siteCategory} />
      </header>
      <main>
        <ContextHolder>{children}</ContextHolder>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
