import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import { themeScript } from "./theme";
import { ThemeRestore } from "./ThemeRestore";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ostrovska Design System",
  description: "Дизайн-система для сайту-портфоліо",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: скрипт теми міняє data-theme на <html> ще до React, і це очікувано.
    <html lang="uk" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Збережена тема ставиться до першого показу сторінки — без блимання. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeRestore />
        {children}
      </body>
    </html>
  );
}
