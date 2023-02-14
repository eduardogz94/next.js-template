import { ComponentStory, ComponentMeta } from "@storybook/react";
import HeaderTemplate, { IHeaderTemplate } from "./Header";
import { mockHeaderTemplateProps } from "./Header.mocks";

export default {
  title: "templates/HeaderTemplate",
  component: HeaderTemplate,
  argTypes: {},
} as ComponentMeta<typeof HeaderTemplate>;

const Template: ComponentStory<typeof HeaderTemplate> = (args) => (
  <HeaderTemplate {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockHeaderTemplateProps.base,
} as IHeaderTemplate;
