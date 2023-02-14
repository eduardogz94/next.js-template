import { IMemoryCard } from "./MemoryModuleCard";

const base: IMemoryCard = {
  module: {},
  onRemove: function (): void {
    throw new Error("Function not implemented.");
  },
};

export const mockMemoryCardMocks = {
  base,
};
