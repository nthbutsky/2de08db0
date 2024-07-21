import { ETab, TTab } from "@/types/tab";
import clsx from "clsx";

type TProps = {
  tabList: TTab[];
  onClick: (name: ETab) => void;
};

export const TabList = ({ tabList, onClick }: TProps) => {
  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          defaultValue={tabList.find((tab) => tab.current)?.name}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        >
          {tabList.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex gap-2">
          {tabList.map((tab) => (
            <button
              onClick={() => onClick(tab.name)}
              key={tab.name}
              type="button"
              aria-current={tab.current ? "page" : undefined}
              className={clsx(
                tab.current
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700",
                "flex whitespace-nowrap text-sm font-medium",
              )}
            >
              {tab.name}
              {tab.count >= 0 && (
                <span
                  className={clsx(
                    tab.current
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-900",
                    "ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
