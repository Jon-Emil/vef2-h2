"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

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
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
