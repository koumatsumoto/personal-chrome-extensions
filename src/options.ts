const page = document.getElementById('buttonDiv') as HTMLDivElement;
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

const constructOptions = (colors = kButtonColors) => {
  for (const item of colors) {
    const button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', () => {
      chrome.storage.sync.set({ color: item }, () => {
        console.log('color is ' + item);
      });
    });
    page.appendChild(button);
  }
};
constructOptions(kButtonColors);
