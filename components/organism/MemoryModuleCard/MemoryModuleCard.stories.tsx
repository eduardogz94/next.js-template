import { ComponentMeta, ComponentStory } from "@storybook/react";
import { mockMemoryCardMocks } from "./MemoryCard.mocks";
import MemoryModuleCard, { IMemoryCard } from "./MemoryModuleCard";

export default {
  title: "templates/MemoryModuleCard",
  component: MemoryModuleCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MemoryModuleCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MemoryModuleCard> = (args) => (
  <MemoryModuleCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMemoryCardMocks.base,
} as IMemoryCard;
