import { useSyncExternalStore } from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { addons } from "storybook/preview-api";
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";
import { themes } from "storybook/theming";

import { fontVariables } from "../app/fonts";
import "../app/globals.css";

// Шрифти: next/font віддає змінні шрифтів класами. На сайті вони стоять на <html>
// у layout, тут ставимо їх так само на <html>, щоб працювало і в історіях, і в Docs.
document.documentElement.classList.add(...fontVariables.split(" "));

// Тема: як на сайті, темна вмикається атрибутом data-theme="dark" на <html>.
type Theme = "light" | "dark";
let currentTheme: Theme = "light";
const listeners = new Set<() => void>();

function applyTheme(value: unknown) {
  const theme: Theme = value === "dark" ? "dark" : "light";
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  if (theme !== currentTheme) {
    currentTheme = theme;
    listeners.forEach((listener) => listener());
  }
}

// Слухаємо перемикач у тулбарі: так тема змінюється і на сторінках Docs (MDX),
// де декоратори історій не спрацьовують.
const channel = addons.getChannel();
channel.on(SET_GLOBALS, ({ globals }) => applyTheme(globals?.theme));
channel.on(GLOBALS_UPDATED, ({ globals }) => applyTheme(globals?.theme));

function useTheme() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => currentTheme,
  );
}

// Оформлення самої сторінки Docs теж перемикається, щоб текст лишався читабельним.
function ThemedDocsContainer(props: DocsContainerProps) {
  const theme = useTheme();
  return <DocsContainer {...props} theme={theme === "dark" ? themes.dark : themes.light} />;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Тема сайту",
      toolbar: {
        title: "Тема",
        icon: "mirror",
        items: [
          { value: "light", title: "Світла", icon: "sun" },
          { value: "dark", title: "Темна", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      applyTheme(context.globals.theme);
      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: ThemedDocsContainer,
    },
  },
};

export default preview;
