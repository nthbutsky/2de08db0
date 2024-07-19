import clsx from "clsx";

import dayjs from "dayjs";

import { TCallDirection, ECallDirection, TCallType } from "@/types/api/call";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  direction: TCallDirection;
  to: number;
  from: number;
  call_type: TCallType;
  created_at: string;
};

export default function CallItem({
  direction,
  to,
  from,
  call_type,
  created_at,
}: TProps) {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
        {direction === ECallDirection.INBOUND ? (
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            size="xs"
            className="text-white"
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="xs"
            className="text-white"
          />
        )}
      </div>

      <div className="flex-auto">
        <h3 className="truncate text-sm font-semibold leading-6 text-gray-900">
          {direction === ECallDirection.INBOUND ? to : from}
        </h3>
        <p
          className={clsx("truncate text-sm", {
            "text-green-500": call_type === "answered",
            "text-red-500": call_type === "missed",
            "text-yellow-500": call_type === "voicemail",
          })}
        >
          {call_type}
        </p>
      </div>

      <time dateTime={created_at} className="flex-none text-xs text-gray-500">
        {dayjs(created_at).format("YYYY-MM-DD")}
      </time>
    </div>
  );
}
