import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function App() {
  const [status, setStatus] = useState('disconnected');
  const [last, setLast] = useState('');

  useEffect(() => {
    const socket = io(); // mesmo host do front (Render), sem URL
    socket.on('connect', () => setStatus('connected'));
    socket.on('disconnect', () => setStatus('disconnected'));
    socket.on('PONG', () => setLast('PONG recebido'));
    socket.on('LOG', (msg) => setLast(msg.message));

    // teste
    socket.emit('JOIN_ROOM', { roomId: 'banca', name: 'Juliana' });
    socket.emit('PING');

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Systemic rules</h1>
      <p>Status: {status}</p>
      <p>Último: {last}</p>
    </div>
  );
}
