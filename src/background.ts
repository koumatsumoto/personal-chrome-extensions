import { receiveComment } from './internal/comments/comments';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            schemes: ['http', 'https'],
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    },
  ]);
});

receiveComment();

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    for (let i = 0; i < details.requestHeaders!.length; ++i) {
      if (details.requestHeaders![i].name === 'Origin') {
        details.requestHeaders!.splice(i, 1);
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['*://scrapbox.io/'] },
  ['blocking', 'requestHeaders'],
);
