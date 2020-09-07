const websocketUrl = 'wss://scrapbox.io/socket.io/?EIO=3&transport=websocket';
const loginCheckApiUrl = 'https://scrapbox.io/api/users/me';
const originUrl = 'https://scrapbox.io';

const aa = async () => {
  try {
    const res = await fetch(loginCheckApiUrl);
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));

    const socket = new WebSocket(websocketUrl);
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
};

const getHeaderValue = (headers: chrome.webRequest.HttpHeader[], name: string) => {
  const target = headers.find((h) => h.name === name);

  return target ? target.value : undefined;
};

const setHeader = (headers: chrome.webRequest.HttpHeader[], name: string, value: string) => {
  const target = headers.find((h) => h.name === name);
  if (target) {
    target.value = value;
  } else {
    headers.push({ name, value });
  }
};

let cookieFromHeader: string | undefined;

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    console.log('[dev] details', details);
    const headers = details.requestHeaders || [];

    if (details.url === loginCheckApiUrl) {
      cookieFromHeader = getHeaderValue(headers, 'Cookie');
    }

    if (details.url === websocketUrl && cookieFromHeader) {
      setHeader(headers, 'Origin', originUrl);
      setHeader(headers, 'Cookie', cookieFromHeader);
    }

    return { requestHeaders: headers };
  },
  { urls: ['wss://scrapbox.io/*', 'https://scrapbox.io/*'], types: ['xmlhttprequest', 'websocket'] },
  ['requestHeaders', 'blocking', 'extraHeaders'],
);

chrome.runtime.onInstalled.addListener(() => {
  setTimeout(() => aa(), 5000);
});
