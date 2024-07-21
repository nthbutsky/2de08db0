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