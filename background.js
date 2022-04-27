chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ reset_font: false });
	console.log(`Reset font`);
});
