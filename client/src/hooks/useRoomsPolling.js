import { useEffect, useState } from 'react';
import { getRoomList } from '../api/roomsApi';

export function useRoomsPolling(intervalMs = 2000) {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;

    async function tick() {
      try {
        const data = await getRoomList();
        if (alive) {
          setRooms(data?.length ? data : []);
        }
      } catch (e) {
        if (alive) setError('Falha ao carregar salas', e.message);
      }
    }

    tick();
    const id = setInterval(tick, intervalMs);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return { rooms, error };
}
