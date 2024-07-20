import { useEffect, useState } from "react";

import clsx from "clsx";

import dayjs from "dayjs";

import { ECallDirection, ECallType, TCall } from "@/types/call";

import { getAllCalls } from "@/api/call";

import { CallItem } from "@/components/CallItem";
import { Modal } from "@/components/Modal";

import { useDurationFormat } from "@/utils/useDurationFormat";

export const ActivityFeed = () => {
  const [callList, setCallList] = useState<TCall[]>([]);
  const [selectedCall, setSelectedCall] = useState<TCall | null>(null);
  const [callItemDetailOpen, setCallItemDetailOpen] = useState(false);

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

  const handleClickOnCallItem = (item: TCall) => {
    setSelectedCall(item);
    setCallItemDetailOpen(true);
  };

  return (
    <>
      <ul
        role="list"
        className="no-scrollbar max-h-[520px] cursor-default divide-y divide-gray-100 overflow-auto"
      >
        {callList
          .sort(
            (a, b) =>
              dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
          )
          .map((item) => (
            <li key={item.id} className="px-2 py-1">
              <CallItem
                direction={item.direction}
                to={item.to}
                from={item.from}
                call_type={item.call_type}
                created_at={item.created_at}
                onOpen={() => handleClickOnCallItem(item)}
              />
            </li>
          ))}
      </ul>

      <Modal
        isOpen={callItemDetailOpen}
        onClose={() => setCallItemDetailOpen(false)}
      >
        <div className="relative cursor-default divide-y divide-gray-100 text-gray-800">
          <div className="flex items-center pb-2">
            <div className="text-lg font-semibold">Call Detail</div>
            <div className="ml-2 inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
              {selectedCall?.direction}
            </div>
          </div>

          <div className="flex items-center gap-2 py-1">
            <div className="text-lg font-semibold">
              {selectedCall?.direction === ECallDirection.INBOUND
                ? selectedCall?.to
                : selectedCall?.from}
            </div>

            <div className="text-sm"> via {selectedCall?.via}</div>
          </div>

          <div className="flex gap-2 py-1 text-sm">
            <div>{dayjs(selectedCall?.created_at).format("MMM DD, YYYY")}</div>
            <div>{dayjs(selectedCall?.created_at).format("HH:mm A")}</div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div
              className={clsx(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                {
                  "bg-green-100 text-green-600":
                    selectedCall?.call_type === ECallType.ANSWERED,
                  "bg-red-100 text-red-600":
                    selectedCall?.call_type === ECallType.MISSED,
                  "bg-yellow-100 text-yellow-600":
                    selectedCall?.call_type === ECallType.VOICEMAIL,
                },
              )}
            >
              {selectedCall?.call_type}
            </div>
            {selectedCall?.call_type === ECallType.ANSWERED && (
              <div className="text-sm">
                {useDurationFormat(selectedCall?.duration || 0)}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
