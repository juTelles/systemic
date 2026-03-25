// shared/protocol.js
export const PROTOCOL_VERSION = 1;

export const MSG = {
  ACTION: "ACTION",
  STATE: "STATE",
  ERROR: "ERROR",
};

export function makeMessage(type, payload, v = PROTOCOL_VERSION) {
  return { type, v, payload };
}