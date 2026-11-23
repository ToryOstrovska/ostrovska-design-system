"use client";

import { useId, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  /** Текст кнопки. Коротке дієслово: «Написати мені», «Дивитись кейс». */
  children: ReactNode;
  /** `primary` — головна дія екрана (заливка `action`), `secondary` — другорядна (без заливки, межа `ink-muted`). */
  variant?: ButtonVariant;
  /** `md` — звичайна, `lg` — велика (перший екран, головний заклик). */
  size?: ButtonSize;
  /**
   * Вимикає кнопку через `aria-disabled`, а не атрибут `disabled`:
   * кнопка лишається у фокусі, читач екрана її озвучує, а натискання нічого не робить.
   */
  disabled?: boolean;
  /**
   * Пояснення, чому кнопка вимкнена. Показується під кнопкою лише у вимкненому стані
   * і звʼязане з нею через `aria-describedby`.
   */
  disabledHint?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-control border-2 font-sans text-button " +
  "underline-offset-4 transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const sizes: Record<ButtonSize, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

// Робочі стани: default і hover. Hover — підкреслення тексту (окремого токена для hover немає),
// у другорядної ще й межа темніє до ink.
const variants: Record<ButtonVariant, string> = {
  primary: "bg-action border-action text-canvas cursor-pointer hover:underline",
  secondary: "bg-canvas border-ink-muted text-ink cursor-pointer hover:underline hover:border-ink",
};

// Вимкнений стан однаковий для обох варіантів: без заливки, приглушений текст, пунктирна межа.
const disabledStyle = "bg-canvas border-ink-muted border-dashed text-ink-muted cursor-not-allowed";

/**
 * Кнопка дизайн-системи. Два варіанти (основна й другорядна), два розміри,
 * стани default, hover, focus і disabled. Будується лише з токенів `@theme`.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  disabledHint,
  type = "button",
  className,
  onClick,
  "aria-describedby": describedBy,
  ...rest
}: ButtonProps) {
  const hintId = useId();
  const showHint = disabled && Boolean(disabledHint);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      // Блокуємо і дію, і відправку форми, якщо type="submit".
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  const button = (
    <button
      {...rest}
      type={type}
      aria-disabled={disabled || undefined}
      aria-describedby={[describedBy, showHint ? hintId : null].filter(Boolean).join(" ") || undefined}
      onClick={handleClick}
      className={[base, sizes[size], disabled ? disabledStyle : variants[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );

  if (!showHint) return button;

  return (
    <span className="inline-flex flex-col items-start gap-2">
      {button}
      <span id={hintId} className="text-small text-ink-muted">
        {disabledHint}
      </span>
    </span>
  );
}
