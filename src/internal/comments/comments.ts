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
  registerMessageHandling((message) => {
    alert(JSON.stringify(message, null, 2));
  });
};
