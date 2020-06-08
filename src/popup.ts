const changeColor = document.getElementById('changeColor') as HTMLButtonElement;
if (!changeColor) {
  throw new Error('#changeColor not found');
}

chrome.storage.sync.get('color', (data) => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.addEventListener('click', (event) => {
  console.log('[dev] click event', event);

  const color = (event.target as any).value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('[dev] tabs', tabs);

    chrome.tabs.executeScript(tabs[0].id!, { code: 'document.body.style.backgroundColor = "' + color + '";' });
  });
});
