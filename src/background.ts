import './setup';
import { Subject } from 'rxjs';
import { ValueOf } from 'ts-essentials';
import { log } from './libs/logger';

chrome.runtime.onInstalled.addListener(() => {
  // installed
  log('[onInstalled]');
});

chrome.runtime.onMessage.addListener((message) => {
  log(message);
});

// User defined keyboard shortcuts
// @see: manifest.json
export const userDefinedShortcutNames = {
  openSearchPage: 'open_search_box',
};

chrome.commands.onCommand.addListener((command: ValueOf<typeof userDefinedShortcutNames>) => {
  switch (command) {
    case userDefinedShortcutNames.openSearchPage: {
      log('userDefinedShortcutNames.openSearchPage:', command);
    }
  }
});

const tabUpdate$ = new Subject<{ tabId: number; changeInfo: chrome.tabs.TabChangeInfo; tab: chrome.tabs.Tab }>();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => tabUpdate$.next({ tabId, changeInfo, tab }));
