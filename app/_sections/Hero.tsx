"use client";

import { Button } from "@/components/Button/Button";
import bubbleTail from "@/assets/bubble-tail.svg";
import chevronDown from "@/assets/icon-chevron-down.svg";

/**
 * Перший екран головної: підпис, позиціонування, лід, дві кнопки
 * і картка-поляроїд з бульбашкою «Привіт».
 *
 * Поляроїд і бульбашка — частини цієї секції, не компоненти дизайн-системи:
 * зібрані лише з токенів. Перевертання поляроїда (фото ↔ маскот) — пізніше.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col items-center gap-8 pt-6 pb-8 lg:flex-row lg:justify-center lg:gap-section"
    >
      {/* Текст */}
      <div className="flex w-full min-w-0 flex-col items-start gap-6 lg:max-w-155">
        <p className="text-small font-medium uppercase text-accent">UX/UI дизайнерка · Німеччина</p>
        {/* До sm — text-heading: «e‑commerce-» у text-display (382 px) ширше за екран 375 px. */}
        <h1 id="hero-title" className="font-display text-heading text-ink sm:text-display">
          Проєктую сайти й застосунки для e‑commerce-команд
        </h1>
        <p className="text-lead text-ink-muted">Щоб покупець не кинув кошик на півдорозі.</p>

        <div className="flex flex-wrap items-start gap-3 pt-4">
          <Button size="lg" href="#cases">
            Дивитись кейси
            <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true" className="size-4 shrink-0">
              <use href={`${chevronDown.src}#icon`} />
            </svg>
          </Button>
          <Button size="lg" variant="secondary" disabled disabledHint="CV додам незабаром">
            Завантажити CV
          </Button>
        </div>
      </div>

      {/* Поляроїд з бульбашкою */}
      <div className="flex shrink-0 flex-col items-start">
        {/* Бульбашка: зсунута праворуч і трохи виходить за поляроїд; хвостик вказує на фото. */}
        <div className="relative z-10 -mr-8 ml-auto flex flex-col items-start">
          <p className="rounded-card border-2 border-ink bg-surface px-4 py-3 font-hand text-hand whitespace-pre-line text-ink">
            {"Привіт! Я Вікторія,\nрада, що ти тут"}
          </p>
          {/* viewBox починається з y=10, а overflow="visible" дає смужці y 8–10 намалюватись
              над SVG, поверх нижньої межі бульбашки: перекриття без відʼємного відступу. */}
          <svg
            viewBox="0 10 60 24"
            width="60"
            height="24"
            overflow="visible"
            aria-hidden="true"
            className="block fill-surface text-ink"
          >
            <use href={`${bubbleTail.src}#tail`} />
          </svg>
        </div>

        {/* Поляроїд: прямі кути, без тіні (тінь у макеті має колір поза токенами). */}
        <figure className="-mt-8 flex w-67 rotate-4 flex-col gap-3 border border-line bg-surface p-4">
          {/* Заглушка фото: справжнє фото, зняте на камеру, додамо пізніше. */}
          <div className="flex aspect-portrait w-full items-center justify-center bg-canvas text-small font-medium text-ink-muted">
            Твоє фото
          </div>
          <figcaption className="font-hand text-hand text-ink">це я :)</figcaption>
        </figure>
      </div>
    </section>
  );
}
