import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import HomeWrapper from "@/components/HomeWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
 
export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A comprehensive expense tracking and ledger management system",
  icons: {
    icon: '/lll.png',
    // icon: '/logo2.png',
  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-black font-poppins`}
        suppressHydrationWarning={true}
      >
        <HomeWrapper>{children}</HomeWrapper>
      </body>
    </html>
  );
}
