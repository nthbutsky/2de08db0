export enum ETab {
  ALL = "all",
  ARCHIVED = "archived",
}

export type TTab = {
  id: string;
  name: ETab;
  count: number;
  current: boolean;
};

export type TTabItemLength = {
  all: number;
  archived: number;
};