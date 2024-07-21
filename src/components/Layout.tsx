import { useEffect, useState } from "react";

import { ETab, TTab, TTabItemLength } from "@/types/tab";

import { TabList } from "@/components/TabList";

type TProps = {
  children: React.ReactNode;
  title: string;
  tabItemLength: TTabItemLength;
  onToggleArchiveAll: () => void;
  isAllArchived: boolean;
  onTabClick: (name: ETab) => void;
};

export const Layout = ({
  children,
  title,
  tabItemLength,
  onToggleArchiveAll,
  isAllArchived,
  onTabClick,
}: TProps) => {
  const [tabList, setTabList] = useState<TTab[]>([
    { id: "1", name: ETab.ALL, count: tabItemLength?.all, current: true },
    {
      id: "2",
      name: ETab.ARCHIVED,
      count: tabItemLength?.archived,
      current: false,
    },
  ]);

  useEffect(() => {
    setTabList((prev) =>
      prev.map((item) => ({
        ...item,
        count: item.id === "1" ? tabItemLength?.all : tabItemLength?.archived,
      })),
    );
  }, [tabItemLength]);

  const handleOnTabClick = (name: ETab) => {
    setTabList((prev) =>
      prev.map((item) => ({
        ...item,
        current: item.name === name ? true : false,
      })),
    );
    onTabClick(name);
  };

  return (
    <div className="min-h-full">
      <div className="py-10">
        <header>
          <div className="mx-auto flex max-w-md items-baseline justify-between p-4 sm:p-6">
            <h1 className="text-3xl font-bold text-purple-900">{title}</h1>
            <TabList tabList={tabList} onClick={handleOnTabClick} />
            <button
              type="button"
              className="rounded bg-purple-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              onClick={onToggleArchiveAll}
            >
              {isAllArchived ? "Unarchive All" : "Archive All"}
            </button>
          </div>
        </header>
        <main>
          <div className="relative mx-auto max-w-md rounded-md border border-gray-100 px-4 py-4 sm:px-6 sm:py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
