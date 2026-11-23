"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import logo from "@/assets/logo-fox.svg";
import { THEME_KEY } from "@/app/theme";

export type NavigationItemId = "cases" | "about" | "contacts";
export type NavigationLanguage = "ua" | "en" | "de";

export interface NavigationItem {
  id: NavigationItemId;
  label: string;
  href: string;
}

/** Пункти меню сайту. Поки це якорі на секції головної сторінки. */
export const navigationItems: NavigationItem[] = [
  { id: "cases", label: "Кейси", href: "#cases" },
  { id: "about", label: "Про мене", href: "#about" },
  { id: "contacts", label: "Контакти", href: "#contacts" },
];

const languages: { code: NavigationLanguage; label: string; name: string; lang: string }[] = [
  { code: "ua", label: "UA", name: "Українська", lang: "uk" },
  { code: "en", label: "EN", name: "English", lang: "en" },
  { code: "de", label: "DE", name: "Deutsch", lang: "de" },
];

export interface NavigationProps {
  /** Активний пункт меню (сторінка чи секція, де зараз людина). Без значення — жоден. */
  current?: NavigationItemId;
  /** Поточна мова сайту. За замовчуванням `ua`. */
  language?: NavigationLanguage;
  /** Викликається, коли людина обирає іншу мову. */
  onLanguageChange?: (language: NavigationLanguage) => void;
  /** Додаткові класи на `<header>`. */
  className?: string;
}

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// ---------- Тема ----------
// Збережену тему ставить скрипт у <head> layout сайту (app/theme.ts), ще до показу сторінки.
// Перемикач лише читає поточний data-theme з <html> і змінює його по кліку,
// тому в Storybook тему з тулбара ніщо не перебиває.

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function setTheme(dark: boolean) {
  if (dark) document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
}

function saveTheme(dark: boolean) {
  try {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch {
    // Сховище недоступне (приватне вікно): тема просто не запамʼятається.
  }
}

/** Перемикач світлої / темної теми: кнопка `role="switch"`, ставить `data-theme="dark"` на `<html>`. */
function ThemeSwitch() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.getAttribute("data-theme") === "dark",
    () => false,
  );

  function toggle() {
    setTheme(!dark);
    saveTheme(!dark);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Темна тема"
      onClick={toggle}
      className={`flex h-7.5 w-14 shrink-0 cursor-pointer items-center rounded-control border-2 border-ink bg-surface hover:bg-ink/5 ${
        dark ? "flex-row-reverse" : ""
      } ${focusRing}`}
    >
      {/* Повзунок: ліворуч у світлій темі, праворуч у темній. Без анімації. */}
      <span aria-hidden="true" className="size-6.5 rounded-control bg-accent" />
      <span aria-hidden="true" className="flex size-6.5 items-center justify-center text-ink">
        {dark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M5.74 0.12C5.27 0.97 5 1.95 5 3c0 3.31 2.69 6 6 6 1.05 0 2.03-.27 2.88-.74C13.29 11.53 10.44 14 7 14 3.13 14 0 10.87 0 7 0 3.57 2.47.71 5.74.12Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" stroke="none" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

// ---------- Мова ----------

function LanguageSwitch({
  language,
  onLanguageChange,
}: {
  language: NavigationLanguage;
  onLanguageChange?: (language: NavigationLanguage) => void;
}) {
  return (
    <ul className="flex items-center gap-3" aria-label="Мова сайту">
      {languages.map((item) => {
        const isCurrent = item.code === language;
        return (
          <li key={item.code}>
            <button
              type="button"
              lang={item.lang}
              aria-label={item.name}
              aria-current={isCurrent ? "true" : undefined}
              onClick={() => onLanguageChange?.(item.code)}
              // Зона натискання не менше 24 × 24 (min-h-6 min-w-6).
              className={`flex min-h-6 min-w-6 cursor-pointer items-center justify-center rounded-control text-small ${
                isCurrent ? "font-semibold text-accent" : "text-ink-muted hover:text-ink"
              } ${focusRing}`}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// ---------- Навігація ----------

/**
 * Шапка сайту з головним меню: логотип (посилання на головну), пункти меню, перемикач мови
 * і перемикач теми. На вузькому екрані меню згортається в кнопку-бургер; відкрите меню
 * показується поверх контенту і закривається клавішею Escape, кліком поза ним або вибором пункту.
 * Будується лише з токенів `@theme`.
 */
export function Navigation({ current, language = "ua", onLanguageChange, className }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    // Фокус повертається на бургер; preventScroll — щоб сторінка не стрибала вгору.
    burgerRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    function onPointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) close();
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const itemBase = `rounded-control text-body font-semibold underline-offset-8 decoration-2 ${focusRing}`;
  const itemState = (active: boolean) => (active ? "text-accent underline" : "text-ink hover:underline");

  return (
    <header
      ref={headerRef}
      className={["relative flex items-center justify-between gap-4 bg-canvas lg:gap-6 pr-4 lg:pr-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        href="/"
        aria-label="Вікторія Островська — на головну"
        className={`group flex min-w-0 items-center gap-3 lg:gap-6 ${focusRing}`}
      >
        {/* Логотип з assets через <use>: плита бере колір через currentColor від text-ink
            (у темній темі стає кремовою), кольори лисички задані в самому SVG. */}
        <svg
          viewBox="0 0 128 80"
          width="128"
          height="80"
          aria-hidden="true"
          className="h-10 w-auto shrink-0 text-ink lg:h-20"
        >
          <use href={`${logo.src}#logo`} />
        </svg>
        <span className="font-hand text-lead font-bold whitespace-nowrap text-ink decoration-2 underline-offset-8 group-hover:underline lg:text-hand">Вікторія Островська</span>
      </Link>

      <nav aria-label="Головне меню" className="flex items-center gap-3 lg:gap-8">
        {/* Широкий екран: пункти в рядок. */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={item.id === current ? "page" : undefined}
                className={`${itemBase} ${itemState(item.id === current)}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
        </div>

        <ThemeSwitch />

        {/* Вузький екран: бургер. */}
        <button
          ref={burgerRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          onClick={() => (open ? close() : setOpen(true))}
          className={`flex size-11 cursor-pointer items-center justify-center rounded-field border-2 border-ink-muted text-ink hover:border-ink lg:hidden ${focusRing}`}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        {/* Відкрите меню — поверх контенту (absolute), сторінку вниз не зсуває. */}
        <div
          id={panelId}
          hidden={!open}
          className="absolute inset-x-0 top-full z-10 border-b border-line bg-surface p-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={item.id === current ? "page" : undefined}
                  onClick={close}
                  // Висота пункту 48 (min-h-12).
                  className={`flex min-h-12 items-center px-4 ${itemBase} ${itemState(item.id === current)}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4 pt-4">
            <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </nav>
    </header>
  );
}
