import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ostrovska Design System",
  description: "Дизайн-система для сайту-портфоліо",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
