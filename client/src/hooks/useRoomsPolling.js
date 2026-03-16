import { useEffect, useState } from 'react';
import { getRoomList } from '../api/roomsApi';

// Custom hook to poll the list of rooms at regular intervals
export function useRoomsPolling(intervalMs = 2000) {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  // Polling effect to fetch room list at regular intervals
  useEffect(() => {
    let alive = true;

    // Function to perform a single polling cycle
    async function runPollingCycle() {
      try {
        const data = await getRoomList();
        if (alive) {
          // Ensure we always set an array, even if the API returns null or undefined
          setRooms(data?.length ? data : []);
        }
      } catch (e) {
        if (alive) setError('FAILED_ROOMS_LIST_LOADING', e.message);
      }
    }

    runPollingCycle();
    // Set up an interval to run the polling cycle at the specified interval
    const id = setInterval(runPollingCycle, intervalMs);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return { rooms, error };
}
