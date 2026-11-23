/*
  Тема сайту. Світла — за замовчуванням (без атрибута), темна — data-theme="dark" на <html>.
  Вибір людини зберігається в localStorage під ключем THEME_KEY ("light" або "dark").
  Якщо вибору ще немає, береться тема системи (prefers-color-scheme).
*/

export const THEME_KEY = "theme";

/**
 * Маленький скрипт для <head> у layout: ставить збережену тему ДО показу сторінки,
 * тому сторінка не блимає світлою темою. try/catch — на випадок, коли localStorage недоступний.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`;

/** Те саме, що themeScript, але як функція: для ThemeRestore (повтор після dev-перемонтування). */
export function applySavedTheme() {
  try {
    let theme = localStorage.getItem(THEME_KEY);
    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  } catch {
    // localStorage недоступний: лишається світла тема.
  }
}
