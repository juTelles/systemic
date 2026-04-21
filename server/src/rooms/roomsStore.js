export function createRoomsStore() {
  const rooms = new Map();

  let nextRoomId = 100;

  return {
    ensure,
    get,
    getAll,
    generateRoomId,
    removeRoom,
  };

  function generateRoomId() {
    return String(nextRoomId++);
  }

  function removeRoom(roomId) {
    if (!rooms.has(roomId)) {
      return false;
    }
    return rooms.delete(roomId);
  }

  function ensure(roomId, createFn) {
    if (!rooms.has(roomId)) {
      const room = createFn(roomId);
      rooms.set(roomId, room);
    }

    return rooms.get(roomId);
  }

  function get(roomId) {
    return rooms.get(roomId);
  }

  function getAll() {
    return Array.from(rooms.values());
  }
}
