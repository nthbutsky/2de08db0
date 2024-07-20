import clsx from "clsx";

import dayjs from "dayjs";

import {
  TCallDirection,
  ECallDirection,
  TCallType,
  ECallType,
} from "@/types/call";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  direction: TCallDirection;
  to: number;
  from: number;
  call_type: TCallType;
  created_at: string;
  onOpen: () => void;
};

export const CallItem = ({
  direction,
  to,
  from,
  call_type,
  created_at,
  onOpen,
}: TProps) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100">
        {direction === ECallDirection.INBOUND ? (
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            size="sm"
            className="text-purple-600"
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="sm"
            className="text-purple-600"
          />
        )}
      </div>

      <div className="flex-auto">
        <h3 className="truncate text-sm font-semibold leading-6 text-gray-900">
          {direction === ECallDirection.INBOUND ? to : from}
        </h3>
        <div className="flex gap-2">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
            {direction}
          </div>
          <div
            className={clsx(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
              {
                "bg-green-100 text-green-600": call_type === ECallType.ANSWERED,
                "bg-red-100 text-red-600": call_type === ECallType.MISSED,
                "bg-yellow-100 text-yellow-600":
                  call_type === ECallType.VOICEMAIL,
              },
            )}
          >
            {call_type}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <time dateTime={created_at} className="text-xs text-gray-500">
          {dayjs(created_at).format("YYYY-MM-DD")}
        </time>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 hover:bg-gray-100"
          type="button"
          onClick={onOpen}
        >
          <FontAwesomeIcon
            icon={faInfo}
            size="sm"
            className="text-purple-500"
          />
        </button>
      </div>
    </div>
  );
};
