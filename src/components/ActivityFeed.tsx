import { useEffect, useState } from "react";

import { TCall } from "@/types/api/call";

import { getAllCalls } from "@/api/call";
import CallItem from "@/components/CallItem";

export default function ActivityFeed() {
  const [callList, setCallList] = useState<TCall[]>([]);

  useEffect(() => {
    getCallList();
  }, []);

  const getCallList = async () => {
    try {
      const response = await getAllCalls();

      setCallList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {callList.map((item) => (
        <li key={item.id} className="py-2">
          <CallItem
            direction={item.direction}
            to={item.to}
            from={item.from}
            call_type={item.call_type}
            created_at={item.created_at}
          />
        </li>
      ))}
    </ul>
  );
}
