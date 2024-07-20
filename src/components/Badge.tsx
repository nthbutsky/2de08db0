import clsx from "clsx";

import { ECallDirection, ECallType } from "@/types/call";

type TProps = {
  text: ECallType | ECallDirection;
  type: ECallType | ECallDirection;
  className?: string;
};

export const Badge = ({ text, type, className }: TProps) => {
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        className,
        {
          "bg-green-100 text-green-600": type === ECallType.ANSWERED,
          "bg-red-100 text-red-600": type === ECallType.MISSED,
          "bg-yellow-100 text-yellow-600": type === ECallType.VOICEMAIL,
          "bg-purple-100 text-purple-600":
            type === ECallDirection.INBOUND || type === ECallDirection.OUTBOUND,
        },
      )}
    >
      {text}
    </div>
  );
};
