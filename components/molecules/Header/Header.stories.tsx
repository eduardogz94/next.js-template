import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./Header";

export default {
  title: "components/molecules/Header",
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Default: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Base = Default.bind({});

Base.args = {};
