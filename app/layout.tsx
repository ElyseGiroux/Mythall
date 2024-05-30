import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Mythall | Grandeur Nature Médiéval Fantastique en Estrie",
  description: "Mythall est un grandeur nature médiéval fantastique en Estrie basée sur Les Royaumes Oubliés",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-parchment">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
