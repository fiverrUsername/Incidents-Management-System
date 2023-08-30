import WebSocket from 'ws';
const ws = new WebSocket.Server({ port: 8080, perMessageDeflate: false });
const clients = new Map<string, WebSocket>();

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

ws.on('connection', (ws: WebSocket) => {
  const id = uuidv4();
  clients.set(id, ws);
  console.log("--------------socket")
  ws.on('message', (messageAsString: string) => {
    console.log("----i an in ws.on message");
    
    [...clients.entries()].forEach(([clientId, client]) => {
      if (clientId !== id) // Don't send the message back to the sender
        client.send(messageAsString);
    });
  });
  ws.on('close', () => {
    clients.delete(id);
  });
});

console.log('WebSocket server is up.');