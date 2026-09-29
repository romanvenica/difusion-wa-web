// Muestra el idioma pedido (#es, #pt, #en), el elegido en la extensión o el del navegador.
(function () {
  var langs = ['es', 'pt', 'en'];
  function show(l) {
    if (langs.indexOf(l) < 0) l = 'es';
    langs.forEach(function (x) { document.getElementById('doc-' + x).hidden = x !== l; });
    document.querySelectorAll('.langs button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    document.documentElement.lang = l;
  }
  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.lang); try { history.replaceState(null, '', '#' + b.dataset.lang); } catch (e) { /* vista incrustada */ } });
  });
  // #es, #pt, #en o un ancla como #terminos-es / #privacy-en
  var h = (location.hash || '').slice(1), m = h.match(/(?:^|-)(es|pt|en)$/);
  var hash = window.LEGAL_LANG || (m ? m[1] : '');
  if (langs.indexOf(hash) >= 0) return show(hash);
  var nav = (navigator.language || 'es').toLowerCase().slice(0, 2);
  show(langs.indexOf(nav) >= 0 ? nav : 'en');
  try {
    chrome.storage.local.get(['difusion_lang'], function (r) { if (r && langs.indexOf(r.difusion_lang) >= 0) show(r.difusion_lang); });
  } catch (e) { /* página pública, fuera de la extensión */ }
})();
