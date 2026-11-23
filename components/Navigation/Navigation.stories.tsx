import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navigation } from "./Navigation";

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  parameters: { layout: "fullscreen" },
  // Під шапкою — текст-заглушка сторінки: видно, що відкрите меню лягає поверх нього, а не зсуває вниз.
  decorators: [
    (Story) => (
      <div className="min-h-80 bg-canvas">
        <Story />
        <p className="p-4 text-body text-ink-muted">
          Тут починається контент сторінки. Відкрите меню на вузькому екрані лягає поверх цього тексту.
        </p>
      </div>
    ),
  ],
  argTypes: {
    current: {
      control: "select",
      options: [undefined, "cases", "about", "contacts"],
      labels: { undefined: "жоден", cases: "Кейси", about: "Про мене", contacts: "Контакти" },
      description: "Активний пункт меню",
    },
    language: { control: "select", options: ["ua", "en", "de"], description: "Поточна мова" },
    onLanguageChange: { action: "language change", table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    current: "cases",
    language: "ua",
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
