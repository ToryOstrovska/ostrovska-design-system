"use client";

import { useLayoutEffect } from "react";
import { applySavedTheme } from "./theme";

/**
 * У режимі розробки React (Strict Mode) один раз перемонтовує сторінку і скидає атрибути <html>,
 * зокрема data-theme, який поставив скрипт у <head>. Тут тема ставиться ще раз до показу.
 * У продакшні нічого не змінює: тема вже стоїть.
 */
export function ThemeRestore() {
  useLayoutEffect(() => {
    applySavedTheme();
  }, []);
  return null;
}
