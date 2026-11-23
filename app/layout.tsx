import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ostrovska Design System",
  description: "Дизайн-система для сайту-портфоліо",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
