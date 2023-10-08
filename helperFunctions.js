function smoothFadeIn(el, displayMethod) {
  el.style.opacity = "1";
  setTimeout(function () {
    el.style.display = displayMethod;
  }, 1000);
}

function smoothFadeOut(el) {
  el.style.opacity = "0";
  setTimeout(function () {
    el.style.display = "none";
  }, 1000);
}

export { smoothFadeIn, smoothFadeOut };
