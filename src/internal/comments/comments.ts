import { registerMessageHandling, sendMessage } from '../message-passing/messages';

export type CommentMessagePayload = {
  pageTitle: string;
  pageUrl: string;
  comment: string;
};

export const addComment = (data: CommentMessagePayload) => {
  sendMessage({
    type: 'comment',
    data,
  });
};

export const receiveComment = () => {
  registerMessageHandling(async (message) => {
    // alert(JSON.stringify(message, null, 2));
    try {
      // const res = await fetch('https://scrapbox.io/api/users/me');
      // const data = await res.json();
      // alert(JSON.stringify(data, null, 2));

      const socket = new WebSocket('wss://scrapbox.io/socket.io/?EIO=3&transport=websocket');
      socket.addEventListener(
        'open',
        () => {
          console.log('[websocket] open');
        },
        { once: true },
      );
      // reconnect on error and close
      socket.addEventListener('close', () => console.log('[websocket] close'), { once: true });
      socket.addEventListener('error', () => console.log('[websocket] error'), { once: true });
      socket.addEventListener('message', (ev: MessageEvent) => console.log('[websocket] message'));
    } catch (e) {
      alert(JSON.stringify(e, null, 2));
    }
  });
};
