import { Caveat, Dela_Gothic_One, Onest } from "next/font/google";

// Текст і інтерфейс (variable-шрифт, усі товщини). Токен: font-sans.
export const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

// Заголовки display і heading. Токен: font-display.
export const delaGothic = Dela_Gothic_One({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-dela-gothic",
  display: "swap",
});

// Рукописні підписи (лише Bold). Токен: font-hand.
export const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  weight: "700",
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = [onest.variable, delaGothic.variable, caveat.variable].join(" ");
