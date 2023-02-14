import { Story, ComponentMeta } from "@storybook/react";
import Footer from "./Footer";

export default {
  title: "components/molecules/Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: Story = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
