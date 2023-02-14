import { ComponentMeta, ComponentStory } from "@storybook/react";
import Modules from "pages/modules";

export default {
  title: "pages/Modules",
  component: Modules,
  argTypes: {},
} as ComponentMeta<typeof Modules>;

const Template: ComponentStory<typeof Modules> = (args: any) => (
  <Modules {...args} />
);

export const Base = Template.bind({});
