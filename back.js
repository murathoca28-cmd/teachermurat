/*! back.js — shared Back button for teachermurat.com
 *
 * Usage on a page (put right before </body>):
 *   <script src="/back.js" data-href="/5/worksheets/un1_buton_5.html"></script>
 *
 * - Adds a "← Back" button at the top of the page content.
 * - If the previous page in the browser history is the target page, it behaves exactly like
 *   the browser back button (no extra history entries pile up). Otherwise it opens the target.
 *
 * Pages that already have their own Back link: give that link  data-back  and a real href
 * (the target), and include  <script src="/back.js"></script>  without data-href.
 */
(function () {
    'use strict';

    var script = document.currentScript;
    var scriptTarget = script ? script.getAttribute('data-href') : null;

    function targetOf(el) {
        var h = el.getAttribute('href');
        if (h && h.indexOf('javascript:') !== 0 && h !== '#') return h;
        return el.getAttribute('data-href') || scriptTarget;
    }

    function goBack(target) {
        try {
            var ref = new URL(document.referrer);
            var tgt = new URL(target, location.href);
            if (ref.origin === location.origin && ref.pathname === tgt.pathname && history.length > 1) {
                history.back();
                return;
            }
        } catch (err) { /* fall through */ }
        location.href = target;
    }

    function bind(el) {
        if (el._tmBack) return;
        el._tmBack = true;
        el.addEventListener('click', function (e) {
            var t = targetOf(el);
            if (!t) return;
            e.preventDefault();
            goBack(t);
        });
    }

    function inject() {
        if (!scriptTarget) return;

        var style = document.createElement('style');
        style.textContent =
            '.tm-back-row{display:flex;justify-content:flex-start;align-self:flex-start;margin:0 0 12px;}' +
            '.tm-back-row .tm-back{display:inline-flex;align-items:center;gap:8px;margin:0;padding:8px 20px;' +
            "font-family:'Segoe UI',Verdana,Tahoma,Arial,system-ui,sans-serif;font-size:18px;font-weight:800;line-height:1.3;" +
            'color:#1A1F23;background:#FFFFFF;border:3px solid #334155;border-radius:14px;box-shadow:0 4px 0 #94A3B8;' +
            'text-decoration:none;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease;}' +
            '.tm-back-row .tm-back:hover{transform:translateY(-2px);box-shadow:0 6px 0 #94A3B8;}' +
            '.tm-back-row .tm-back:active{transform:translateY(3px);box-shadow:0 1px 0 #94A3B8;}' +
            '.tm-back-row .tm-back:focus-visible{outline:4px solid #F0A500;outline-offset:3px;}';
        document.head.appendChild(style);

        var row = document.createElement('div');
        row.className = 'tm-back-row';
        var a = document.createElement('a');
        a.className = 'tm-back';
        a.href = scriptTarget;
        a.setAttribute('data-back', '');
        a.textContent = '← Back';
        row.appendChild(a);

        var host = document.querySelector('.app-container') ||
                   document.querySelector('.container') ||
                   document.querySelector('main');
        if (host) {
            host.insertBefore(row, host.firstChild);
        } else {
            var nav = document.getElementById('navbar-placeholder');
            if (nav && nav.parentNode) nav.parentNode.insertBefore(row, nav.nextSibling);
            else document.body.insertBefore(row, document.body.firstChild);
        }
    }

    function init() {
        if (!document.querySelector('[data-back]')) inject();
        Array.prototype.forEach.call(document.querySelectorAll('[data-back]'), bind);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
