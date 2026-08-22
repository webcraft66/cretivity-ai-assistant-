import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "CerevityAI Partnerships | Chat with our Partnership Assistant",
  description:
    "Get instant answers about CerevityAI's AI & Robotics education partnership program — curriculum, pricing, timelines, and how to get started.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2F6FED",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${display.variable} ${body.variable}`}>
      <body className="h-full antialiased font-body bg-canvas text-ink dark:bg-canvas-dark dark:text-canvas">
        {children}
      </body>
    </html>
  );
}
