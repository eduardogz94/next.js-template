import { Story } from "@storybook/react";
import DisplayModuleData from "./DisplayModuleData";

export default {
  title: "components/molecules/DisplayModuleData",
  component: DisplayModuleData,
  argTypes: {},
};

const Template: Story = (args) => <DisplayModuleData {...args} />;

export const Default = Template.bind({});

Default.args = {
  module: {
    name: "Test module",
    description: "This is a test module",
    data: new Map([
      ["key1", "value1"],
      ["key2", "value2"],
    ]),
  },
};
