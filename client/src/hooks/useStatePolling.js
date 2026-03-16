import { useEffect, useState, useRef } from "react";
import { getRoomState } from "../api/roomsApi";

// This custom Hook does four things
// 1) fetches the initial state of the room,
// 2) polls for updates at regular intervals,
// 3) handles loading and error states, and
// 4) ensures that state updates only occur when there are actual changes
// to the room state, preventing unnecessary re-renders.

// Custom hook to poll the state of a room at regular intervals
export function useStatePolling(roomId, intervalMs = 1200) {
  const [roomState, setRoomState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState(null);

  // Using refs to hold mutable values that don't trigger re-renders
  const lastRev = useRef(0);
  const fetching = useRef(false);

  //reset state when roomId changes
  useEffect(() => {
    setRoomState(null);
    setIsLoading(true);
    setErrorCode(null);
    lastRev.current = 0;
  }, [roomId]);

  // Polling effect to fetch room state at regular intervals
  useEffect(() => {
    if (!roomId) return;

    // Using a flag to prevent state updates after unmounting
    let alive = true;

    // Function to perform a single polling cycle
    async function runPollingCycle() {
      if (fetching.current) return;
      fetching.current = true;

      try {
        const result = await getRoomState(roomId, lastRev.current);
        // If the component has unmounted while waiting for the response, we should not attempt to update state
        if (!alive) return;
        // Handle errors from the API response
        if (!result.ok) {
          setErrorCode(result.code || "INTERNAL_ERROR");
          setIsLoading(false);
          return;
        }
        // Clear any previous error if the request was successful
        setErrorCode(null);

        // Only update state if there has been a change in the room state
        if (result.changed) {
          lastRev.current = result.rev;
          setRoomState(result.state);
        }
        // Mark loading as complete after the first successful fetch
        setIsLoading(false);
        // console.log(`Polling successful for room ${roomId} with rev ${lastRev.current}:`, result.state);
      } catch (err) {
        // If the component has unmounted while waiting for the response, we should not attempt to update state
        if (!alive) return;
        // Log the error and set an appropriate error code
        console.error("Polling error:", err);
        setErrorCode("INTERNAL_ERROR");
        setIsLoading(false);

      } finally {
        // Mark that we're no longer fetching, allowing the next polling cycle to proceed
        fetching.current = false;
      }
    }

    runPollingCycle();
    // Set up an interval to run the polling cycle at the specified interval
    const id = setInterval(runPollingCycle, intervalMs);

    // Cleanup function to clear the interval and prevent state updates after unmounting
    return () => {
      alive = false;
      clearInterval(id);
    };
    // We intentionally only depend on roomId and intervalMs. roomState and errorCode are excluded
    // to avoid restarting the interval on every state update, which would cause unnecessary re-renders
    // and reset the polling cycle.
  }, [roomId, intervalMs]);

  return {
    roomState,
    isLoading,
    errorCode,
  };
}
