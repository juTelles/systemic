export function createRoomsStore() {
  const rooms = new Map();

  let nextRoomId = 100;

  return {
    ensure,
    get,
    getAll,
    generateRoomId,
  };

  function generateRoomId() {
    return String(nextRoomId++);
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
