import { useEffect, useState } from 'react';
import { getAllCalls } from '@/api/call';
import { TCall } from '@/types/api/call';

export default function App() {
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
    <div>
      {callList.map((call) => (
        <div key={call.id}>
          <div>{JSON.stringify(call)}</div>
        </div>
      ))}
    </div>
  );
}
