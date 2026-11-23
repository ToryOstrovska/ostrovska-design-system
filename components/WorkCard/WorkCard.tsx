import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export interface WorkCardProps {
  /** Назва роботи. Вона ж — текст єдиного посилання картки. */
  title: string;
  /** Короткий опис: що зроблено і навіщо. На картці обрізається до 2 рядків. */
  description: string;
  /** Куди веде картка: сторінка кейсу. */
  href: string;
  /** Обкладинка. Картинку клади в теку `assets` і імпортуй: `import cover from "@/assets/…"`. */
  cover: StaticImageData;
  /** Опис обкладинки для читача екрана: що на ній зображено. Обовʼязковий. */
  coverAlt: string;
  /** Рівень заголовка назви. `3` — якщо над картками є заголовок секції `h2`. За замовчуванням `3`. */
  headingLevel?: 2 | 3;
  /** Додаткові класи на `<article>` (наприклад, ширина в сітці сторінки). */
  className?: string;
}

/**
 * Картка роботи (кейсу): обкладинка, назва й короткий опис. Уся картка клікабельна,
 * але посилання одне — на назві; його невидимий шар `::after` розтягнутий на всю картку.
 * Стани default, hover і focus. Будується лише з токенів `@theme`.
 */
export function WorkCard({
  title,
  description,
  href,
  cover,
  coverAlt,
  headingLevel = 3,
  className,
}: WorkCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={[
        // relative — щоб шар посилання ::after накрив усю картку.
        "group relative flex flex-col gap-6 rounded-card border border-line bg-surface p-6",
        // hover: окремого токена немає, декоративна рамка line темнішає до ink-muted.
        "transition-colors hover:border-ink-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative aspect-cover overflow-hidden rounded-card">
        <Image
          src={cover}
          alt={coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Heading className="font-display text-heading text-ink">
          <Link
            href={href}
            className={
              // Шар ::after розтягує клік на всю картку.
              "after:absolute after:inset-0 after:rounded-card " +
              // Фокус з клавіатури: контур accent 2 px з відступом 2 px навколо всієї картки.
              "focus-visible:outline-none focus-visible:after:outline-2 " +
              "focus-visible:after:outline-offset-2 focus-visible:after:outline-accent " +
              // hover: назва підкреслюється, щоб було видно, що це посилання.
              "group-hover:underline"
            }
          >
            {title}
          </Link>
        </Heading>
        <p className="line-clamp-2 text-body text-ink-muted">{description}</p>
      </div>
    </article>
  );
}
