(function(){
  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

  // Cookie banner
  const banner = qs('.cookie-banner');
  const saveBtn = qs('#cookie-save');
  const analyticsChk = qs('#cookie-analytics');
  const COOKIE_KEY = 'studyflow.cookies';

  function showBannerIfNeeded(){
    try {
      const pref = JSON.parse(localStorage.getItem(COOKIE_KEY) || 'null');
      if (!pref) banner.hidden = false; else banner.hidden = true;
    } catch { banner.hidden = false; }
  }
  function saveCookies(){
    const pref = { functional: true, analytics: !!analyticsChk.checked, savedAt: new Date().toISOString() };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(pref));
    banner.hidden = true;
    if (pref.analytics) {
      // Mock analytics
      console.log('Analytics enabled (mock).');
    }
  }
  if (saveBtn) saveBtn.addEventListener('click', saveCookies);
  showBannerIfNeeded();

  // Modals
  const modals = {
    demo: qs('#modal-demo'),
    purchase: qs('#modal-purchase')
  };
  qsa('[data-modal-open]').forEach(function(btn){
    btn.addEventListener('click', function(){
      const id = btn.getAttribute('data-modal-open');
      const m = modals[id];
      if (m) { m.hidden = false; m.querySelector('[data-modal-close]')?.focus(); }
    });
  });
  qsa('[data-modal-close]').forEach(function(btn){
    btn.addEventListener('click', function(){
      const m = btn.closest('.modal'); if (m) m.hidden = true;
    });
  });
  // Close on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { Object.values(modals).forEach(m => m && (m.hidden = true)); }
  });

  // Trap focus basic (accessibility)
  Object.values(modals).forEach(function(m){
    if (!m) return;
    m.addEventListener('keydown', function(e){
      if (e.key !== 'Tab') return;
      const focusables = Array.from(m.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  });
})();
