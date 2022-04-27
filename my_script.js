(function () {
	resetBrowserFont();
})();

function resetBrowserFont() {
	chrome.storage.sync.get("reset_font", ({ reset_font }) => {
		if (reset_font) {
			[...document.querySelectorAll("*")].forEach((ele) => {
				if (!ele.getAttribute("aria-hidden") && (ele.textContent || "").trim() != "") {
					ele.style.fontFamily = "unset";
				}
			});
		}
	});
}
