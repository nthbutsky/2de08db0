import dayjs from "dayjs";

import { TCallDirection, ECallDirection, TCallType } from "@/types/call";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

import { Badge } from "@/components/Badge";

type TProps = {
  direction: TCallDirection;
  to: number;
  from: number;
  call_type: TCallType;
  created_at: string;
  onOpen: () => void;
  onArchive: () => void;
};

export const CallItem = ({
  direction,
  to,
  from,
  call_type,
  created_at,
  onOpen,
  onArchive,
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
          {direction && <Badge text={direction} type={direction} />}
          {call_type && <Badge text={call_type} type={call_type} />}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          title="Archive"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 hover:bg-gray-100"
          type="button"
          onClick={onArchive}
        >
          <FontAwesomeIcon
            icon={faBoxArchive}
            size="sm"
            className="text-purple-500"
          />
        </button>
        <time dateTime={created_at} className="text-xs text-gray-500">
          {dayjs(created_at).format("YYYY-MM-DD")}
        </time>
        <button
          title="Call Detail"
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
