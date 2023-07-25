const ws = new WebSocket('ws://localhost:7071/ws');
ws.onmessage = (webSocketMessage) => {
  const messageBody = JSON.parse(webSocketMessage.data);
  console.log(messageBody)
};