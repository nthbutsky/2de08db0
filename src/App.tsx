import { useEffect, useState } from "react";

import { getAllCalls } from "@/api/call";

import { TCall } from "@/types/call";
import { ETab } from "@/types/tab";

import { ActivityFeed } from "@/components/ActivityFeed";
import { Layout, TTabItemLength } from "@/components/Layout";

export const App = () => {
  const [callList, setCallList] = useState<TCall[]>([]);
  const [isAllArchived, setIsAllArchived] = useState(false);
  const [tabItemLength, setTabItemLength] = useState<TTabItemLength>({
    all: 0,
    archived: 0,
  });
  const [filter, setFilter] = useState(ETab.ALL);

  const getCallList = async () => {
    try {
      const response = await getAllCalls();

      setCallList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getCallList();
  }, []);

  useEffect(() => {
    setTabItemLength({
      all: callList.filter((item) => !item.is_archived).length,
      archived: callList.filter((item) => item.is_archived).length,
    });
  }, [callList]);

  const handleClickOnArchiveAll = () => {
    setCallList((prev) =>
      prev.map((item) => ({
        ...item,
        is_archived: !isAllArchived,
      })),
    );
    setIsAllArchived(!isAllArchived);
  };

  const handleClickOnArchiveCall = (payload: TCall) => {
    setCallList((prev) =>
      prev.map((item) =>
        item.id === payload.id ? { ...item, is_archived: true } : item,
      ),
    );
  };

  return (
    <Layout
      title="AirCall"
      tabItemLength={tabItemLength}
      onToggleArchiveAll={() => handleClickOnArchiveAll()}
      isAllArchived={isAllArchived}
      onTabClick={(name) => setFilter(name)}
    >
      <ActivityFeed
        feedList={callList}
        onArchiveCall={handleClickOnArchiveCall}
        filter={filter}
      />
    </Layout>
  );
};
