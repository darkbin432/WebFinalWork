/**
 * 	Overall version 1.6
 * 	This version 1.6
 */

if (window.outerWidth > 1280) {
	document.getElementsByTagName("html")[0].style.fontSize = Math.round(window.outerWidth / 640 * 10) + "px";
} else {
	document.getElementsByTagName("html")[0].style.fontSize = 1280 / 640 * 10 + "px";
}

window.onresize = function () {
	if (window.outerWidth > 1280) {
		document.getElementsByTagName("html")[0].style.fontSize = Math.round(window.outerWidth / 640 * 10) + "px";
	} else {
		document.getElementsByTagName("html")[0].style.fontSize = 1280 / 640 * 10 + "px";
	}
}

