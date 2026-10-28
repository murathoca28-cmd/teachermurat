/*! pdf-tools.js — Fullscreen / Download (and Present for slides) buttons for the PDF modals
 *
 * Usage (right before </body>, next to back.js):
 *   <script src="/pdf-tools.js"></script>                 worksheets, summary, vocabulary: Fullscreen + Download
 *   <script src="/pdf-tools.js" data-present></script>    slides: Present + Fullscreen + Download
 *
 * Works with the existing modals: it finds the .modal-header, adds the buttons next to the
 * Close button, and reads the PDF address from the iframe's ?file= parameter, so the pages'
 * own scripts do not need any change.
 */
(function () {
    'use strict';

    var script = document.currentScript;
    var withPresent = !!(script && script.hasAttribute('data-present'));

    var header = document.querySelector('.modal-header');
    if (!header) return;
    var box = header.parentNode;
    var closeBtn = header.querySelector('button');

    /* ---------- styles (high contrast, thick borders: smartboard friendly) ---------- */
    var css = [
        '.modal-box, .modal-content { width: 96% !important; max-width: 1500px !important; height: 94vh !important; }',
        '.pdf-tools { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }',
        '.pdf-tool-btn { font-family: inherit; display: inline-flex; align-items: center; gap: 8px; margin: 0;',
        '  padding: 8px 18px; font-size: 1.1rem; font-weight: 800; line-height: 1.2; color: #FFFFFF;',
        '  background: #0F766E; border: 3px solid #064E48; border-radius: 12px; box-shadow: 0 4px 0 #064E48;',
        '  cursor: pointer; transition: transform .12s ease, box-shadow .12s ease; }',
        '.pdf-tool-btn.dark { background: #1E293B; border-color: #0F172A; box-shadow: 0 4px 0 #0F172A; }',
        '.pdf-tool-btn:hover { transform: translateY(-2px); }',
        '.pdf-tool-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #0F172A; }',
        '.pdf-tool-btn:focus-visible { outline: 4px solid #F0A500; outline-offset: 3px; }',
        '.pdf-tool-btn svg { width: 1.25em; height: 1.25em; flex-shrink: 0; }',
        '.modal-box:fullscreen, .modal-content:fullscreen { width: 100% !important; max-width: none !important; height: 100% !important; border-radius: 0; border: 0; }',
        '.modal-box:-webkit-full-screen, .modal-content:-webkit-full-screen { width: 100% !important; max-width: none !important; height: 100% !important; border-radius: 0; border: 0; }',
        '.pdf-nav { display: flex; align-items: center; gap: 8px; }',
        '.pdf-nav[hidden] { display: none; }',
        '.pdf-nav-btn { display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 42px; padding: 0; margin: 0;',
        '  color: #FFFFFF; background: #1E293B; border: 3px solid #0F172A; border-radius: 12px; box-shadow: 0 4px 0 #0F172A; cursor: pointer; }',
        '.pdf-nav-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #0F172A; }',
        '.pdf-nav-btn:focus-visible, .pdf-nav-input:focus-visible { outline: 4px solid #F0A500; outline-offset: 3px; }',
        '.pdf-nav-btn svg { width: 20px; height: 20px; }',
        '.pdf-nav-input { width: 58px; height: 42px; padding: 0; font-family: inherit; font-size: 1.2rem; font-weight: 800; text-align: center;',
        '  color: #064E48; background: #FFFFFF; border: 3px solid #334155; border-radius: 10px; }',
        '.pdf-nav-total { font-size: 1.2rem; font-weight: 800; color: #064E48; min-width: 3.2em; }',
        '@media (max-width: 1000px) { .pdf-nav { display: none; } }',
        '@media (max-width: 760px) { .pdf-tool-btn .lbl { display: none; } .pdf-tool-btn { padding: 8px 12px; } }'
    ].join('\n');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    /* ---------- helpers ---------- */
    var ICONS = {
        present: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
        full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
        down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M6 10l6 6 6-6M4 21h16"/></svg>'
    };

    function makeBtn(cls, icon, label, title, handler) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pdf-tool-btn ' + cls;
        b.title = title;
        b.setAttribute('aria-label', title);
        b.innerHTML = icon + '<span class="lbl">' + label + '</span>';
        b.addEventListener('click', handler);
        return b;
    }

    function frame() { return box.querySelector('iframe'); }

    function pdfUrl() {
        var f = frame();
        if (!f) return '';
        try {
            var src = f.getAttribute('src') || '';
            var i = src.indexOf('file=');
            if (i === -1) return '';
            return decodeURIComponent(src.slice(i + 5).split('#')[0]);
        } catch (e) { return ''; }
    }

    function rawApp() {
        var f = frame();
        try {
            var app = f && f.contentWindow && f.contentWindow.PDFViewerApplication;
            return app && app.pdfViewer ? app : null;
        } catch (e) { return null; } // cross-origin (e.g. www. address): not reachable
    }

    function viewerApp() {
        var app = rawApp();
        return app && app.pdfViewer.pagesCount ? app : null; // ready once the PDF pages are loaded
    }

    function enterFullscreen(el) {
        var fn = el.requestFullscreen || el.webkitRequestFullscreen;
        if (fn) { try { var p = fn.call(el); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    }

    function isFullscreen() { return document.fullscreenElement || document.webkitFullscreenElement; }

    function exitFullscreen() {
        var fn = document.exitFullscreen || document.webkitExitFullscreen;
        if (fn) fn.call(document);
    }

    /* ---------- actions ---------- */
    function toggleFullscreen() {
        if (isFullscreen()) exitFullscreen(); else enterFullscreen(box);
    }

    function present() {
        var f = frame();
        if (!f || !f.contentWindow) return;
        var app = viewerApp();
        if (app) { app.requestPresentationMode(); return; }      // same origin: call it directly
        if (rawApp()) return;                                     // same origin, PDF still loading
        // Different origin (e.g. localhost page + live viewer): ask the viewer by message,
        // delegating the click's fullscreen permission so the viewer may enter fullscreen.
        var acked = false;
        function onAck(e) { if (e.data && e.data.tmPresentAck) { acked = true; window.removeEventListener('message', onAck); } }
        window.addEventListener('message', onAck);
        var origin = '*';
        try { origin = new URL(f.getAttribute('src'), location.href).origin; } catch (e) {}
        try { f.contentWindow.postMessage({ tmPresent: true }, { targetOrigin: origin, delegate: 'fullscreen' }); }
        catch (e) { f.contentWindow.postMessage({ tmPresent: true }, '*'); }
        setTimeout(function () {
            window.removeEventListener('message', onAck);
            if (!acked) enterFullscreen(f);                       // old viewer without message support
        }, 800);
    }

    function download() {
        var url = pdfUrl();
        if (!url) return;
        var name = decodeURIComponent(url.split('?')[0].split('/').pop() || 'document.pdf');
        fetch(url, { mode: 'cors' })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
            .then(function (blob) {
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = name;
                document.body.appendChild(a);
                a.click();
                setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
            })
            .catch(function () { window.open(url, '_blank', 'noopener'); }); // CORS/network problem: open it instead
    }

    /* ---------- build the button group ---------- */
    var tools = document.createElement('div');
    tools.className = 'pdf-tools';
    if (withPresent) tools.appendChild(makeBtn('', ICONS.present, 'Present', 'Presentation mode', present));
    tools.appendChild(makeBtn('dark', ICONS.full, 'Fullscreen', 'Fullscreen', toggleFullscreen));
    tools.appendChild(makeBtn('dark', ICONS.down, 'Download', 'Download PDF', download));
    if (closeBtn) {
        closeBtn.parentNode.replaceChild(tools, closeBtn); // keeps the close button's own click handler
        tools.appendChild(closeBtn);
    } else {
        header.appendChild(tools);
    }

    /* ---------- extras ---------- */
    // Local preview (Live Server etc.): pages point to the live viewer on teachermurat.com.
    // On localhost use the viewer from the local folder instead, so unpublished changes can be tested.
    if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) {
        new MutationObserver(function () {
            var f = frame();
            var src = f && f.getAttribute('src');
            var live = 'https://teachermurat.com/pdfjs/';
            if (src && src.indexOf(live) === 0) f.setAttribute('src', '/pdfjs/' + src.slice(live.length));
        }).observe(box, { childList: true, subtree: true });
    }

    // The iframe must be allowed to go fullscreen (needed for presentation mode); clones keep the attribute.
    var f0 = frame();
    if (f0) { f0.setAttribute('allowfullscreen', ''); f0.setAttribute('allow', 'fullscreen'); }

    /* ---------- page navigation in the header (slides; other PDFs only when they have 3+ pages) ---------- */
    var nav = document.createElement('div');
    nav.className = 'pdf-nav';
    nav.hidden = true;
    var navPrev = document.createElement('button');
    navPrev.type = 'button'; navPrev.className = 'pdf-nav-btn'; navPrev.title = 'Previous page'; navPrev.setAttribute('aria-label', 'Previous page');
    navPrev.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15 4v16L5 12z"/></svg>';
    var navNext = document.createElement('button');
    navNext.type = 'button'; navNext.className = 'pdf-nav-btn'; navNext.title = 'Next page'; navNext.setAttribute('aria-label', 'Next page');
    navNext.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 4v16l10-8z"/></svg>';
    var navInput = document.createElement('input');
    navInput.type = 'text'; navInput.inputMode = 'numeric'; navInput.className = 'pdf-nav-input'; navInput.title = 'Go to page'; navInput.setAttribute('aria-label', 'Page number');
    var navTotal = document.createElement('span');
    navTotal.className = 'pdf-nav-total';
    nav.appendChild(navPrev); nav.appendChild(navInput); nav.appendChild(navTotal); nav.appendChild(navNext);
    header.insertBefore(nav, tools);

    var curApp = null;
    function goTo(n) {
        if (!curApp) return;
        var v = curApp.pdfViewer, max = v.pagesCount || 1;
        n = parseInt(n, 10);
        if (!isNaN(n)) v.currentPageNumber = Math.min(Math.max(n, 1), max);
        navInput.value = v.currentPageNumber;
    }
    navPrev.addEventListener('click', function () { if (curApp) curApp.pdfViewer.previousPage(); });
    navNext.addEventListener('click', function () { if (curApp) curApp.pdfViewer.nextPage(); });
    navInput.addEventListener('focus', function () { navInput.select(); });
    navInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { goTo(navInput.value); navInput.blur(); }
        e.stopPropagation(); // typing digits must not trigger other shortcuts
    });
    navInput.addEventListener('change', function () { goTo(navInput.value); });

    function attach(app) {
        curApp = app;
        var v = app.pdfViewer, bus = app.eventBus;
        function refresh() {
            var n = v.pagesCount || 0;
            nav.hidden = !((withPresent && n > 1) || n > 2);
            navTotal.textContent = '/ ' + n;
            navInput.value = v.currentPageNumber;
        }
        function fit() { if (withPresent) v.currentScaleValue = 'page-fit'; } // slides: whole slide visible
        bus.on('pagesinit', function () { fit(); refresh(); });
        bus.on('pagechanging', function (e) { navInput.value = e.pageNumber; });
        if (v.pagesCount) { fit(); refresh(); }
    }

    // Every time the page opens a PDF it creates a fresh iframe: hook each one when it has loaded.
    new MutationObserver(function () {
        var f = frame();
        if (!f || f._tmHooked) return;
        f._tmHooked = true;
        nav.hidden = true;
        curApp = null;
        f.addEventListener('load', function () {
            var tries = 0;
            (function wait() {
                if (frame() !== f) return;
                var app = rawApp();
                if (!app && tries === 0 && withPresent) { try { f.contentWindow.postMessage({ tmFit: true }, '*'); } catch (e) {} }
                if (app && app.eventBus) attach(app);
                else if (tries++ < 60) setTimeout(wait, 150);
            })();
        });
    }).observe(box, { childList: true, subtree: true });
})();
