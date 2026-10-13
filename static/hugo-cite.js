/* =============================================================================
/* Hugo-Cite.js
/* -----------------------------------------------------------------------------
/* Shifts a citation pop-up sideways when it is shown, so it stays inside the
/* viewport. Placing it on show also covers citations added later, e.g. copied
/* into a footnote pop-up. Without this script the pop-ups still show, just
/* not shifted, and the citations stay normal links. */

(function () {
  var margin = 8; /* px, keep in sync with max-width in hugo-cite.css */
  /* pop-ups only show on hover where there is hover (hugo-cite.css) */
  var noHover = window.matchMedia('(hover: none)');

  function place(popup) {
    var viewportWidth = document.documentElement.clientWidth;
    popup.style.left = '';
    /* Hidden pop-ups are display: none (hugo-cite.css), so show it for the
    /* measurement, without transitions: these would keep it shown while fading. */
    var hidden = getComputedStyle(popup).display === 'none';
    if (hidden) {
      popup.style.transition = 'none';
      popup.style.display = 'block';
    }
    var rect = popup.getBoundingClientRect();
    if (hidden) {
      popup.style.display = '';
      getComputedStyle(popup).display; /* apply before transitions are back */
      popup.style.transition = '';
    }
    var shift = Math.min(0, viewportWidth - margin - rect.right);
    shift = Math.max(shift, margin - rect.left);
    popup.style.left = shift ? shift + 'px' : '';
  }

  /* Delegated, so citations added after load are covered too. */
  function onEnter(e) {
    if (noHover.matches) return;
    var group = e.target.closest && e.target.closest('.hugo-cite-group');
    if (!group || group.contains(e.relatedTarget)) return;
    var popup = group.querySelector('.hugo-cite-citation');
    if (popup) place(popup);
  }

  document.addEventListener('mouseover', onEnter);
})();
