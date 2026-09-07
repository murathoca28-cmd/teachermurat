(function () {
  var HINT_KEY = 'pdfHintShown_v1';
  if (localStorage.getItem(HINT_KEY)) return;

  var tries = 0;
  var checkInterval = setInterval(function () {
    tries++;
    var anchor = document.getElementById('downloadButton');
    if (anchor || tries > 40) {
      clearInterval(checkInterval);
      if (anchor) showHint();
    }
  }, 100);

  function showHint() {
    var popup = document.createElement('div');
    popup.id = 'pdfCustomHint';
    popup.innerHTML =
      '<span>💡 Yukarıdan sunum moduna geçebilir veya dosyayı indirebilirsiniz</span>' +
      '<button id="pdfHintClose" aria-label="Kapat">✕</button>';
    document.body.appendChild(popup);

    var close = function () {
      popup.remove();
      localStorage.setItem(HINT_KEY, '1');
    };
    document.getElementById('pdfHintClose').addEventListener('click', close);
    setTimeout(close, 6000);
  }
})();