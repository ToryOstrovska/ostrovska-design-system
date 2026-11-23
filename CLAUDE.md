@AGENTS.md

# ostrovska-design-system

## Стек

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт, тому перед кожним пушем питай мене.

## Токени

Токени записані в `app/globals.css` (блоки `@theme static`: усі змінні завжди потрапляють у CSS, навіть без класів, — сторінка «Токени» в Storybook бере їх через `var()`), джерело рішень — [docs/tokens-draft.md](docs/tokens-draft.md). Стандартні кольори, розміри тексту й радіуси Tailwind скинуті: користуйся лише токенами нижче. Назви — за роллю, не за кольором.

- **Кольори** (`bg-*`, `text-*`, `border-*`): `canvas`, `surface`, `line` (лише декоративні лінії, не межі полів), `accent`, `ink`, `ink-muted`, `danger`, `action`, `bubble`, `bubble-ink`.
- **Текст** (`text-*`, з висотою рядка): `caption`, `body`, `lead`, `heading`, `display`, `button` (з жирністю 600), `label` (з жирністю 500 і трекінгом 0.08em), `small`, `hand` (з жирністю 700). Шрифт і регістр токен не задає: `heading`/`display` — разом із `font-display`, `hand` — з `font-hand`, `label` — з `uppercase`.
- **Шрифти** (`font-*`): `font-sans` — Onest (за замовчуванням), `font-display` — Dela Gothic One, `font-hand` — Caveat Bold. Підключені через next/font у `app/fonts.ts` (latin + cyrillic).
- **Радіуси** (`rounded-*`): `control` (кнопки, перемикач, чипи), `field` (поля форми), `card` (картки, бульбашка). Поляроїд — без радіуса.
- **Пропорції** (`aspect-*`): `cover` (16/9), `portrait` (7/8); стандартні теж доступні.
- **Відступи**: окремих токенів немає, лише кроки 8, 12, 16, 24, 32 px — у Tailwind `2`, `3`, `4`, `6`, `8` (наприклад `p-4`, `gap-6`).
- **Лише для сторінок, не для компонентів**: `max-w-page` (1296px) і `section` (80px, наприклад `py-section`).

**Темна тема.** У `@theme` — значення світлої теми. Темна вмикається атрибутом `data-theme="dark"` на `<html>`: селектор `[data-theme="dark"]` у `globals.css` перевизначає ті самі змінні `--color-*`. Класи лишаються ті самі (`bg-canvas`, `text-ink`), змінюються лише значення, тож `dark:` не потрібен. Перемикача теми на сайті поки немає.

## Компоненти

Кожен компонент лежить у `components/<Назва>/` разом з історією (`.stories.tsx`) і документацією (`.mdx`). Повний опис — на сторінці Docs у Storybook.

- **Button** — [components/Button/Button.tsx](components/Button/Button.tsx), Storybook: Components → Button. Варіанти `primary` (заливка `action`, текст `canvas`) і `secondary` (фон `canvas`, межа `ink-muted`, текст `ink`); розміри `md` і `lg`; кути `rounded-control`. Hover: `bg-action/85` і `bg-ink/5` + межа `ink`. Фокус: контур `accent` 2 px з відступом 2 px. Вимкнена — через `aria-disabled` (не `disabled`), лишається у фокусі; пояснення `disabledHint` під кнопкою звʼязане через `aria-describedby`. Для переходу на іншу сторінку — посилання, не кнопка.
- **FormField** (поле форми) — [components/FormField/FormField.tsx](components/FormField/FormField.tsx), Storybook: Components → FormField. Однорядкове текстове поле; підпис (`text-small`) завжди над полем, справжній `<label for>`. Фон `surface`, межа 2 px `ink-muted` (не `line`), кути `rounded-field`, текст `text-body`. Hover: межа `ink`. Фокус: контур `accent` 2 px з відступом 2 px. Помилка (`error` + `errorMessage`): межа `danger`, під полем іконка й текст `danger`; `aria-invalid="true"`, `aria-describedby` на текст помилки, оголошення через `aria-live="polite"`. Disabled — атрибут `disabled`: фон `canvas`, пунктирна межа й текст `ink-muted`.

## Правила

Заповнимо далі.

## Посилання

- План сайту: [docs/plan.md](docs/plan.md)
