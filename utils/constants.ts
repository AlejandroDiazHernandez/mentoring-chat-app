export enum SocketEvents {
  create_room = "create_room",
  emit_new_room = "emit_new_room",
  new_user_connected = "new_user_connected",
  disconnect = "disconnect",
}

export interface Room {
  name: string;
  participants: unknown[];
}
