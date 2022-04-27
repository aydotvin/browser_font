(function () {
	let resetState = document.getElementById("reset_font");

	chrome.storage.sync.get("reset_font", ({ reset_font }) => {
		if (reset_font) {
			resetState.classList.add("on");
		} else {
			resetState.classList.add("off");
		}
	});

	resetState.addEventListener("click", async () => {
		let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: () => {
				chrome.storage.sync.get("reset_font", ({ reset_font }) => {
					chrome.storage.sync.set({ reset_font: !reset_font });
					if (reset_font) {
						location.reload();
					} else {
						[...document.querySelectorAll("*")].forEach((ele) => {
							if (!ele.getAttribute("aria-hidden") && (ele.textContent || "").trim() != "") {
								ele.style.fontFamily = "unset";
							}
						});
					}
				});
			},
		});
		window.close();
	});
})();
