import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import GridBackground from "@/components/ui/GridBackground";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Bajaj HackRx 5.0 Kratos",
  description: "made by some really cool people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-svh grid *:[grid-area:1/-1]`}>
        <GridBackground/>
        <Navbar/>
        <div className="z-10">
        {children}
        </div>
      </body>
    </html>
  );
}
