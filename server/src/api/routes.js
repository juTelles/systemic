import express from 'express';
import { ERRORS } from '../../../shared/src/constants/errors.js'

export function createRoutes({ rooms, runGameLoop }) {
  const router = express.Router();

  router.get('/rooms', (req, res) => {
    try {
      const roomsList = rooms.listRooms();
      res.json({ roomsList });
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        code: err.code || err.message || "INTERNAL_ERROR",
      });
    }
  });

  router.post('/rooms/createRoom', (req, res) => {
    try {
      const result = rooms.createRoom();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        code: err.code || err.message || "INTERNAL_ERROR",
      });
    }
  });

  router.post('/rooms/:roomId/join', (req, res) => {
    try {
      const { roomId } = req.params;
      const { nickname } = req.body;

      const result = rooms.joinRoom(roomId, nickname);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        code: err.code || err.message || "INTERNAL_ERROR",
      });
    }
  });

  router.post('/rooms/:roomId/leave', (req, res) => {
    try {
      const { roomId } = req.params;
      const { playerId } = req.body;

      const result = rooms.leaveRoom(roomId, playerId);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        code: err.code || err.message || "INTERNAL_ERROR",
      });
    }
  });
  //TODO: fix leave feature, not implemented anymore > leave room and leave game

  router.get('/rooms/:roomId/state', (req, res) => {
    try {
      const { roomId } = req.params;
      const clientRev = Number(req.query.rev ?? 0);

      let roomState = rooms.getState(roomId);

      if (!roomState) {
        return res.status(404).json({ code: ERRORS.ROOM_NOT_FOUND });
      }

      roomState = runGameLoop(roomState, roomId);

      const serverRev = roomState.meta.rev;

      if (clientRev === serverRev) {
        return res.json({ changed: false });
      }

      res.json({
        changed: true,
        rev: serverRev,
        state: roomState,
      });
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        code: err.code || err.message || "INTERNAL_ERROR",
      });
    }

  });

  router.post('/rooms/:roomId/action', (req, res) => {
    try {
      const { roomId } = req.params;
      const { action } = req.body;

      let roomState = rooms.getState(roomId);

      if (!roomState) {
        return res.status(404).json({ error: 'Room not found' });
      }

      roomState = runGameLoop(roomState, roomId, action);

      res.json({ roomState });
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).json({
        code: err.code || err.message || "INTERNAL_ERROR",
      });
    }
  });

  return router;
}