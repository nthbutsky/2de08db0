import { useCallback, useEffect, useMemo, useState } from "react";

import { getAllCalls, resetAllCalls, updateCall } from "@/api/call";

import { TCall } from "@/types/call";
import { ETab } from "@/types/tab";

import { ActivityFeed } from "@/components/ActivityFeed";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";

export const App = () => {
  const [callList, setCallList] = useState<TCall[]>([]);
  const [isAllArchived, setIsAllArchived] = useState(false);
  const [filter, setFilter] = useState(ETab.ALL);
  const [isLoading, setIsLoading] = useState(false);

  const getCallList = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCalls();

      setCallList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const archiveCall = async (payload: TCall) => {
    setIsLoading(true);
    try {
      await updateCall(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    getCallList();
  };

  const archiveAll = async (payload: TCall) => {
    setIsLoading(true);
    try {
      await updateCall(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const unarchiveAll = async () => {
    setIsLoading(true);
    try {
      await resetAllCalls();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOnArchiveAll = useCallback(async () => {
    if (isAllArchived) {
      setCallList((prev) =>
        prev.map((item) => ({
          ...item,
          is_archived: false,
        })),
      );
      unarchiveAll();
      setIsAllArchived(false);
      return;
    }

    setCallList((prev) =>
      prev.map((item) => ({
        ...item,
        is_archived: true,
      })),
    );
    callList.forEach((item) => archiveAll({ ...item, is_archived: true }));
    setIsAllArchived(true);
  }, [callList, isAllArchived]);

  const handleClickOnArchiveCall = useCallback((payload: TCall) => {
    archiveCall({
      ...payload,
      is_archived: true,
    });
  }, []);

  useEffect(() => {
    getCallList();
  }, [isAllArchived]);

  useEffect(() => {
    setIsAllArchived(callList.every((item) => item.is_archived === true));
  }, [callList]);

  const tabItemLength = useMemo(() => {
    return {
      all: callList.filter((item) => !item.is_archived).length,
      archived: callList.filter((item) => item.is_archived).length,
    };
  }, [callList]);

  return (
    <Layout
      title="AirCall"
      tabItemLength={tabItemLength}
      onToggleArchiveAll={() => handleClickOnArchiveAll()}
      isAllArchived={isAllArchived}
      onTabClick={(name) => setFilter(name)}
    >
      {isLoading ? (
        <LoadingSpinner text="Loading ..." />
      ) : (
        <ActivityFeed
          feedList={callList}
          onArchiveCall={handleClickOnArchiveCall}
          filter={filter}
        />
      )}
    </Layout>
  );
};
