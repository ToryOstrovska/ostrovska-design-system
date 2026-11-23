import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import cover from "@/assets/family-flowers-cover.png";
import { WorkCard } from "./WorkCard";

const meta = {
  title: "Components/WorkCard",
  component: WorkCard,
  argTypes: {
    title: { control: "text", description: "Назва роботи (текст посилання)" },
    description: { control: "text", description: "Короткий опис, обрізається до 2 рядків" },
    href: { control: "text", description: "Адреса сторінки кейсу" },
    coverAlt: { control: "text", description: "Опис обкладинки для читача екрана" },
    headingLevel: { control: "select", options: [2, 3], description: "Рівень заголовка назви" },
    cover: { control: false, description: "Обкладинка: імпорт картинки з теки assets" },
    className: { control: false },
  },
  args: {
    title: "Family Flowers",
    description:
      "Редизайн інтернет-магазину квітів у Львові: щоб люди вірили, що букет буде як на фото, " +
      "і замовляли з телефона швидше.",
    href: "/cases/family-flowers",
    cover,
    coverAlt:
      "Обкладинка кейсу Family Flowers: новий сайт квіткового магазину на ноутбуці й телефоні, поруч півонії",
    headingLevel: 3,
  },
  // Картка стоїть у колонці сітки з двох колонок, як на головній, а не на всю ширину.
  decorators: [
    (Story) => (
      <div className="grid grid-cols-2 gap-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
