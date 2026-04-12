import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Ledger",
  description: "A calm financial tracker for creators.",
  verification: {
    google: "QFdcHZ7iAIYKARzKzsHOzW-GEUEBdzzdD9XsQt6diTo"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
