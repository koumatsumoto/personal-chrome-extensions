export const getCurrentActiveTab = () =>
  new Promise<chrome.tabs.Tab>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length < 1) {
        reject(new Error('tab is not found'));
      } else {
        resolve(tabs[0]);
      }
    });
  });

export const getCurrentActivePageInformation = async () => {
  const tab = await getCurrentActiveTab();
  if (!tab.title) {
    throw new Error('title is empty');
  }
  if (!tab.url) {
    throw new Error('url is empty');
  }

  return {
    title: tab.title,
    url: tab.url,
  };
};
