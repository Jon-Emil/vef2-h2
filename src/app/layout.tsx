import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <main>
            {children}
          </main>

          <footer>
            <h2>Website Info</h2>
            <div>
              <p>Made by:</p>
              <a href="https://github.com/Jon-Emil">Jon-Emil</a>  
              <a href="https://github.com/Sigurdur-ari">Sigurdur-ari</a>
              <a href="https://github.com/Dagurvidar">Dagurvidar</a>
              <p>This project was made for the Hópverkefni 2 assignment for the Vefforritun 2 class in Háskóli Íslands</p>
            </div>
          </footer>
        </body>
    </html>
  );
}
