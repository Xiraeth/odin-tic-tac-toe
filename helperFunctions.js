function smoothFadeIn(el, delay, displayMethod) {
  el.style.opacity = "1";
  setTimeout(function () {
    el.style.display = displayMethod;
  }, delay);
}

function smoothFadeOut(el, delay) {
  el.style.opacity = "0";
  setTimeout(function () {
    el.style.display = "none";
  }, delay);
}

export { smoothFadeIn, smoothFadeOut };
