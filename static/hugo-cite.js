/* =============================================================================
/* Hugo-Cite.js
/* -----------------------------------------------------------------------------
/* Shifts the citation pop-ups sideways so they stay inside the viewport.
/* Hidden pop-ups still take up layout space, so one sticking out past the
/* right edge would otherwise make the whole page scroll sideways.
/* Load with `defer`, so the page is parsed when this runs. */

(function () {
  var margin = 8; /* px, keep in sync with max-width in hugo-cite.css */

  function place() {
    var popups = document.querySelectorAll('.hugo-cite-group .hugo-cite-citation');
    var viewportWidth = document.documentElement.clientWidth;

    /* Reset all, then measure all, then move all, to avoid a reflow per pop-up. */
    popups.forEach(function (popup) { popup.style.left = ''; });
    var rects = Array.prototype.map.call(popups, function (popup) {
      return popup.getBoundingClientRect();
    });
    popups.forEach(function (popup, i) {
      var shift = Math.min(0, viewportWidth - margin - rects[i].right);
      shift = Math.max(shift, margin - rects[i].left);
      popup.style.left = shift ? shift + 'px' : '';
    });
  }

  place();
  /* Web fonts and images can move the citations once loaded. */
  window.addEventListener('load', place);
  window.addEventListener('resize', place);
})();
