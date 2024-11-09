import { useState, useEffect } from "react";

export function useEventsSource<T>(url: string, onData?: (data: T) => void) {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);
        setError(undefined);
        setData(data);
        onData?.(data);
        setIsPending(false);
      } catch (e) {
        setError(e);
      }
    });

    gameEvents.addEventListener("error", (e) => {
      setError(e);
    });

    return () => gameEvents.close();
  }, [url]);

  return {
    dataStream: data,
    error,
    isPending,
  };
}
