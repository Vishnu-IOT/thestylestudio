import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/component/Header";
// import Sidebar from "@/component/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Saree Admin Dashboard",
  description: "Sarees Website's Admin Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Header />
        <Sidebar /> */}
        {children}
      </body>
    </html>
  );
}
