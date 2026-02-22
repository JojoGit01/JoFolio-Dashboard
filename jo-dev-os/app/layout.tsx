import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fontUi = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontData = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontUi.variable} ${fontDisplay.variable} ${fontData.variable}`}>
      <body className="font-ui">{children}</body>
    </html>
  );
}
