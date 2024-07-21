import { useState } from "react";

import dayjs from "dayjs";

import { ECallDirection, ECallType, TCall } from "@/types/call";
import { ETab } from "@/types/tab";

import { CallItem } from "@/components/CallItem";
import { Modal } from "@/components/Modal";
import { Badge } from "@/components/Badge";

import { useDurationFormat } from "@/utils/useDurationFormat";

type TProps = {
  feedList: TCall[];
  onArchiveCall: (item: TCall) => void;
  filter: string;
};

export const ActivityFeed = ({ feedList, onArchiveCall, filter }: TProps) => {
  const [selectedCall, setSelectedCall] = useState<TCall | null>(null);
  const [callItemDetailOpen, setCallItemDetailOpen] = useState(false);

  const handleClickOnCallItem = (item: TCall) => {
    setSelectedCall(item);
    setCallItemDetailOpen(true);
  };

  const filteredList = feedList
    .filter((item) =>
      filter === ETab.ALL ? !item.is_archived : item.is_archived,
    )
    .sort(
      (a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
    );

  return (
    <>
      <ul
        role="list"
        className="no-scrollbar max-h-[520px] cursor-default divide-y divide-gray-100 overflow-auto"
      >
        {filteredList.length === 0 && filter === ETab.ALL ? (
          <li className="px-2 py-1 text-center text-gray-500">All archived</li>
        ) : filteredList.length === 0 && filter === ETab.ARCHIVED ? (
          <li className="px-2 py-1 text-center text-gray-500">
            No archived calls
          </li>
        ) : (
          filteredList.map((item) => (
            <li key={item.id} className="px-2 py-1">
              <CallItem
                direction={item.direction}
                to={item.to}
                from={item.from}
                call_type={item.call_type}
                created_at={item.created_at}
                onOpen={() => handleClickOnCallItem(item)}
                onArchive={() => {
                  onArchiveCall(item);
                }}
              />
            </li>
          ))
        )}
      </ul>

      <Modal
        isOpen={callItemDetailOpen}
        onClose={() => setCallItemDetailOpen(false)}
      >
        <div className="relative cursor-default divide-y divide-gray-100 text-gray-800">
          <div className="flex items-center gap-2 pb-2">
            <div className="text-lg font-semibold">Call Detail</div>
            {selectedCall?.direction && (
              <Badge
                text={selectedCall?.direction}
                type={selectedCall?.direction}
              />
            )}
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
            {selectedCall?.call_type && (
              <Badge
                text={selectedCall?.call_type}
                type={selectedCall?.call_type}
              />
            )}

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
