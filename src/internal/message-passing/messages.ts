export type Message = {
  type: string;
  data: Record<string, any>;
};

export const sendMessage = (message: Message, callback?: (message?: Message) => void) => {
  chrome.runtime.sendMessage(message, (response?: Message) => {
    if (callback) {
      callback(response);
    }
  });
};

export const registerMessageHandling = (
  fn: (message: Message, sender: chrome.runtime.MessageSender, callback: (message?: Message) => void) => void,
) => {
  chrome.runtime.onMessage.addListener(fn);
};
