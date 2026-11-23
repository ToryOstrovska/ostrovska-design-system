import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"], description: "Варіант кнопки" },
    size: { control: "select", options: ["md", "lg"], description: "Розмір" },
    disabled: { control: "boolean", description: "Вимкнена (через aria-disabled)" },
    disabledHint: { control: "text", description: "Пояснення під вимкненою кнопкою" },
    children: { control: "text", description: "Текст кнопки" },
  },
  args: {
    children: "Написати мені",
    variant: "primary",
    size: "md",
    disabled: false,
    disabledHint: "Спершу заповніть усі поля форми",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
