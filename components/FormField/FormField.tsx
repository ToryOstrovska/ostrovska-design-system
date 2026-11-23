"use client";

import { useId, type InputHTMLAttributes } from "react";

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Підпис поля. Завжди стоїть над полем і звʼязаний з ним через `<label for>`. Обовʼязковий. */
  label: string;
  /** `id` поля. Якщо не передано, створюється автоматично. */
  id?: string;
  /**
   * Стан помилки: межа поля `danger`, під полем іконка й текст помилки,
   * на полі `aria-invalid="true"` і `aria-describedby` на текст помилки.
   */
  error?: boolean;
  /** Текст помилки під полем. Показується лише разом з `error`. Пиши, що виправити: «Вкажіть email». */
  errorMessage?: string;
  /** Вимикає поле (атрибут `disabled`): у поле не можна ввести текст і перейти клавішею Tab. */
  disabled?: boolean;
}

// Межа 2, фон surface, межа ink-muted (контраст не менше 3:1). Hover без нових токенів:
// межа темнішає до ink, як у другорядної кнопки. Фокус: контур accent 2 з відступом 2.
const base =
  "w-full rounded-field border-2 bg-surface px-4 py-3 font-sans text-body text-ink " +
  "placeholder:text-ink-muted transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const normalStyle = "border-ink-muted hover:border-ink";
const errorStyle = "border-danger";
const disabledStyle = "border-dashed border-ink-muted bg-canvas text-ink-muted cursor-not-allowed";

/** Іконка помилки: коло зі знаком оклику. Колір береться з тексту (`currentColor`). */
function ErrorIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="6.75" />
      <path d="M8 4.5v4" />
      <circle cx="8" cy="11.25" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Поле форми: однорядкове текстове поле з підписом над ним.
 * Стани default, hover, focus, заповнене, помилка й disabled. Будується лише з токенів `@theme`.
 */
export function FormField({
  label,
  id,
  error = false,
  errorMessage,
  disabled = false,
  type = "text",
  className,
  "aria-describedby": describedBy,
  ...rest
}: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const showError = error && !disabled;
  const hasMessage = showError && Boolean(errorMessage);

  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className={["text-small font-medium", disabled ? "text-ink-muted" : "text-ink"].join(" ")}>
        {label}
      </label>

      <input
        {...rest}
        id={inputId}
        type={type}
        disabled={disabled}
        aria-invalid={showError || undefined}
        aria-describedby={[describedBy, hasMessage ? errorId : null].filter(Boolean).join(" ") || undefined}
        className={[base, disabled ? disabledStyle : showError ? errorStyle : normalStyle].join(" ")}
      />

      {/* Контейнер завжди в DOM: так aria-live оголошує помилку, коли вона зʼявляється. */}
      <p id={errorId} aria-live="polite" className="text-small text-danger empty:hidden">
        {hasMessage ? (
          <span className="flex items-center gap-2">
            <ErrorIcon />
            <span>{errorMessage}</span>
          </span>
        ) : null}
      </p>
    </div>
  );
}
