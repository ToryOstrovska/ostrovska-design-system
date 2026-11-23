@AGENTS.md

# ostrovska-design-system

## Проєкт і стек

Дизайн-система й сайт-портфоліо Вікторії Островської.

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4: токени в `app/globals.css` (блоки `@theme static`), джерело рішень — [docs/tokens-draft.md](docs/tokens-draft.md)
- Storybook 10 (`@storybook/nextjs-vite`, addon-a11y, addon-docs), конфіг у `.storybook/`
- Шрифти через next/font у `app/fonts.ts` (latin + cyrillic)

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт, тому перед кожним пушем питай мене.

## Кольори

Стандартна палітра Tailwind скинута (`--color-*: initial`). Назви — за роллю, не за кольором. Класи: `bg-*`, `text-*`, `border-*`.

| Токен | Для чого |
| --- | --- |
| `canvas` | фон сторінки (`bg-canvas`); текст на основній кнопці (`text-canvas`) |
| `surface` | картки, поля, панель меню, бульбашка (`bg-surface`) |
| `line` | лише декоративні лінії й рамки карток (`border-line`), не межі полів |
| `accent` | акцентний текст, поточна мова, активний пункт меню, контур фокусу (`outline-accent`) |
| `ink` | основний текст (`text-ink`), межа при hover |
| `ink-muted` | приглушений текст, межі полів і другорядних кнопок (`border-ink-muted`) |
| `danger` | текст помилки й межа поля в стані помилки (`text-danger`, `border-danger`) |
| `action` | заливка основної кнопки (`bg-action`), текст на ній — `canvas` |

**Темна тема.** У `@theme` — значення світлої теми. Темна вмикається атрибутом `data-theme="dark"` на `<html>`: селектор `[data-theme="dark"]` у `globals.css` перевизначає ті самі `--color-*`. Класи лишаються ті самі (`bg-canvas`, `text-ink`), `dark:` не потрібен. Перемикач — у Navigation; збережений вибір (або тему системи) ставить скрипт у `<head>` layout (`app/theme.ts`, `themeScript`), `app/ThemeRestore.tsx` повторює це після dev-перемонтування Strict Mode.

Прозорість токена дозволена для станів: `hover:bg-action/85`, `hover:bg-ink/5`.

## Типографіка

Стандартні розміри Tailwind скинуті (`--text-*: initial`). Токен задає розмір і висоту рядка; шрифт і регістр — окремо.

| Клас | Розмір / рядок | Разом із |
| --- | --- | --- |
| `text-caption` | 12 / 16 | — |
| `text-body` | 16 / 24 | — |
| `text-lead` | 20 / 30 | — |
| `text-heading` | 28 / 36 | `font-display` |
| `text-display` | 48 / 60 | `font-display` |
| `text-button` | 16 / 20, жирність 600 | — |
| `text-small` | 14 / 20 | — |
| `text-hand` | 24 / 28, жирність 700 | `font-hand` |

Шрифти: `font-sans` — Onest (за замовчуванням), `font-display` — Dela Gothic One, `font-hand` — Caveat Bold.

## Відступи, радіуси й пропорції

- **Відступи:** окремих токенів немає, лише кроки 8, 12, 16, 24, 32 px — у класах `2`, `3`, `4`, `6`, `8` (`p-4`, `gap-6`, `px-8`).
- **Розкладка сторінки** (лише на сторінках, не в компонентах): `max-w-page` (1296px), `section` (80px: `py-section`, `gap-section`).
- **Радіуси — лише два** (`--radius-*: initial`): `rounded-control` (999px: кнопки, перемикач, чипи, поля форми, бургер), `rounded-card` (24px: картки, бульбашка). Поляроїд — без радіуса.
- **Пропорції:** `aspect-cover` (16/9, обкладинка кейсу), `aspect-portrait` (7/8, фото в поляроїді); стандартні (`aspect-square`, `aspect-video`) теж доступні.

## Компоненти

Кожен компонент лежить у `components/<Назва>/`: `<Назва>.tsx`, історія `.stories.tsx` (Storybook: Components → <Назва>) і документація `.mdx`.

- **Button** — [components/Button/Button.tsx](components/Button/Button.tsx). Варіанти `primary` (`bg-action text-canvas`) і `secondary` (`bg-canvas border-ink-muted text-ink`); розміри `md` (`px-6 py-3`) і `lg` (`px-8 py-4`); `rounded-control`, межа 2 px.
  Стани: hover — `bg-action/85` / `bg-ink/5` + `border-ink`; focus — `outline-2 outline-offset-2 outline-accent`; disabled — `aria-disabled` (не `disabled`), лишається у фокусі, пунктирна межа `ink-muted`, текст `ink-muted`; пояснення `disabledHint` під кнопкою через `aria-describedby`.
  З `href` рендериться `next/link` з тими самими стилями; вимкнене посилання — `<a>` без `href`, `role="link"`, `aria-disabled`.
- **FormField** — [components/FormField/FormField.tsx](components/FormField/FormField.tsx). Однорядкове поле; підпис `text-small font-medium` над полем, справжній `<label for>`. `bg-surface`, межа 2 px `ink-muted` (не `line`), `rounded-control`, `text-body`.
  Стани: hover — `border-ink`; focus — контур `accent` 2 px з відступом 2 px; помилка (`error` + `errorMessage`) — `border-danger`, під полем іконка й текст `danger`, `aria-invalid="true"`, `aria-describedby`, `aria-live="polite"`; disabled — атрибут `disabled`, `bg-canvas`, пунктирна межа й текст `ink-muted`.
- **WorkCard** — [components/WorkCard/WorkCard.tsx](components/WorkCard/WorkCard.tsx). `<article>`: обкладинка (`aspect-cover`, `next/image` з `fill`, обовʼязковий `coverAlt`), назва (`text-heading font-display`, `h3` або `h2` через `headingLevel`), опис (`text-body text-ink-muted line-clamp-2`). `bg-surface`, рамка 1 px `line`, `rounded-card`, `p-6`, `gap-6`, `gap-4`. Одне посилання на назві, його `::after` на всю картку.
  Стани: hover — `border-ink-muted`, назва підкреслена; focus — контур `accent` 2 px з відступом 2 px навколо картки.
- **Navigation** — [components/Navigation/Navigation.tsx](components/Navigation/Navigation.tsx). `<header>`: логотип (`assets/logo-fox.svg` через `<svg><use href="…#logo">`, плита `fill="currentColor"` від `text-ink`; імʼя `font-hand`, `text-lead` / `lg:text-hand`) — посилання на головну з `aria-label="Вікторія Островська — на головну"`; `<nav aria-label="Головне меню">`: Кейси, Про мене, Контакти (`#cases`, `#about`, `#contacts`), мова UA / EN / DE, перемикач теми. Пропси: `current`, `language`, `onLanguageChange`.
  Пункт: `text-button text-ink`; hover — підкреслення; активний — `text-accent` + підкреслення, `aria-current="page"`; focus — контур `accent`. Мова: поточна `text-small font-semibold text-accent` з `aria-current="true"`, інші `text-small text-ink-muted`, зона від 24×24. Тема — `button role="switch" aria-checked aria-label="Темна тема"`, змінює `data-theme` і `localStorage` (ключ `theme`), без анімації.
  До `lg` — бургер 44×44 (`aria-expanded`, `aria-controls`, межа `ink-muted`, `rounded-control`); панель `surface` поверх контенту (`absolute`), пункти по 48 px; закривається Escape, кліком поза нею або вибором пункту, фокус повертається на бургер.

## Правила

- **Тільки токени.** Кольори, розміри тексту, радіуси й пропорції беруться лише з `@theme`. Класів, яких там немає (`text-white`, `bg-black`, `text-gray-500`, `rounded-lg`, `text-xl`), не використовуй.
- **Відступи в компонентах** — тільки кроки 8, 12, 16, 24, 32 px (числа `2`, `3`, `4`, `6`, `8` у класах). Токени розкладки (`max-w-page`, `py-section`) — тільки на сторінках.
- **Без довільних значень** у квадратних дужках: `p-[13px]`, `h-[150px]`, `text-[#...]` заборонені.
- **Нових кольорів не додавай.** Потрібен новий — спитай мене й спершу онови `docs/tokens-draft.md`.
- **Кольори ілюстрацій маскота не токенізуються.** Лисичка в SVG (`assets/logo-fox.svg` тощо) має власні кольори пікселів; токени — лише для інтерфейсу (плита логотипа — `currentColor`).
- **Готові компоненти** (Button, FormField, WorkCard, Navigation) використовуй замість нових. Посилання у вигляді кнопки — `Button` з `href`.
- **Стани.** Кожен інтерактивний елемент має default, hover, focus (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`) і disabled; поле форми — ще й помилку.
- **Вимкнена кнопка** — через `aria-disabled` з поясненням (`disabledHint`), не атрибутом `disabled`.
- **Іконки — лише два розміри:** `size-4` (16 px) або `size-5` (20 px). Колір — `currentColor` від тексту.
- **Картинки** лежать у `assets/` і імпортуються (`import cover from "@/assets/…"`), не з `public/`.
- **Темна тема** — лише через `data-theme`; `dark:` не використовуй.
- **Storybook.** Після змін у компоненті онови його історію (`.stories.tsx`) і документацію (`.mdx`).

### Доступність (WCAG 2.2 AA)

- Зона натискання — не менше 24×24 px (бургер — 44×44).
- Анімації й переходи поважають `prefers-reduced-motion`: для руху додавай `motion-reduce:transition-none` / `motion-reduce:animate-none`.
- Фокус завжди видимий (контур `accent`); підписи полів — справжні `<label>`; помилки звʼязані через `aria-describedby`.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
- Рішення щодо токенів: [docs/tokens-draft.md](docs/tokens-draft.md)
- Storybook: `npm run storybook` → http://localhost:6006 (Docs кожного компонента, сторінка «Токени»); збірка — `npm run build-storybook`
