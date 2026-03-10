import express from "express";

export function createRoutes({ rooms }) {
  const router = express.Router();

  router.get("/rooms", (req, res) => {
    const roomsList = rooms.listRooms();
    // console.log("Getting all rooms", roomsList);
    res.json({ roomsList });
  });

  router.post("/rooms/createRoom", (req, res) => {
    const result = rooms.createRoom();
    console.log("Creating room", result);
    res.json(result);
  });

  router.post("/rooms/:roomId/join", (req, res) => {
    const { roomId } = req.params;
    const { nickname } = req.body;

    const result = rooms.joinRoom(roomId, nickname);
    console.log("Joining room", roomId, "with nickname", nickname);
    res.json(result);
  });

  router.post("/rooms/:roomId/leave", (req, res) => {
    const { roomId } = req.params;
    const { playerId } = req.body;

    const result = rooms.leaveRoom(roomId, playerId);
    console.log("Leaving room", roomId);
    res.json(result);
  });

  router.get("/rooms/:roomId/state", (req, res) => {
    const { roomId } = req.params;
    const clientRev = Number(req.query.rev ?? 0);

    const room = roomsService.getRoom(roomId);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const serverRev = room.state.rev;

    if (clientRev === serverRev) {
      return res.json({ changed: false });
    }

    res.json({
      changed: true,
      rev: serverRev,
      state: room.state
    });
  });

  router.post("/rooms/:roomId/action", (req, res) => {
    const { roomId } = req.params;
    const { action, playerId } = req.body;

    const state = rooms.applyRoomAction(roomId, action, { playerId });

    res.json({ state });
  });

  return router;
}