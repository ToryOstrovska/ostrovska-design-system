import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const meta = {
  title: "Components/FormField",
  component: FormField,
  argTypes: {
    label: { control: "text", description: "Підпис над полем" },
    defaultValue: { control: "text", description: "Значення поля (порожнє — default, з текстом — заповнене)" },
    placeholder: { control: "text", description: "Підказка в порожньому полі" },
    error: { control: "boolean", description: "Стан помилки" },
    errorMessage: { control: "text", description: "Текст помилки під полем" },
    disabled: { control: "boolean", description: "Вимкнене поле" },
  },
  args: {
    label: "Email",
    defaultValue: "",
    placeholder: "name@example.com",
    error: false,
    errorMessage: "Вкажіть email у форматі name@example.com",
    disabled: false,
    type: "email",
  },
  // key перемальовує поле, коли в Controls змінюється значення: так перемикається стан «заповнене».
  render: (args) => <FormField key={String(args.defaultValue)} {...args} />,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
