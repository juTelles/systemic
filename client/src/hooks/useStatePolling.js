import { useEffect, useState, useRef } from "react";
import { getRoomState } from "../api/roomsApi";

export function useStatePolling(roomId, intervalMs = 1200) {
  const [state, setState] = useState(null);
  const lastRev = useRef(0);
  const fetching = useRef(false);

  useEffect(() => {
    if (!roomId) return;

    let alive = true;

    async function tick() {
      if (fetching.current) return;
      fetching.current = true;

      try {
        const data = await getRoomState(roomId, lastRev.current);

        if (data.changed && alive) {
          lastRev.current = data.rev;
          setState(data.state);
        }
      } catch (err) {
        console.error("Polling error:", err);
      } finally {
        fetching.current = false;
      }
    }

    tick();
    const id = setInterval(tick, intervalMs);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [roomId, intervalMs]);

  return state;
}
