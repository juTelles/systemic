import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './App.module.css';
import './theme.css';
import Board from './components/board/Board';
import Header from './components/header/Header';
import TopBar from './components/topBar/TopBar';
import BottomPanel from './components/bottomPanel/BottomPanel';

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
    <div className={styles.pageContainer}>
      <Header title="Systemic" />
      <TopBar />
      <Board />
      <BottomPanel />
    </div>
  );
}
