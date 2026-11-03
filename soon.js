/*! soon.js - shared "under construction" pop-up + link slots for teachermurat.com
 *
 * Every not-ready button has an EMPTY LINK SLOT:
 *   <button type="button" class="card-btn is-locked" data-soon="Summary" data-link="">Summary</button>
 *
 *   data-link=""            -> button stays locked; clicking opens the "Yapim Asamasinda" pop-up
 *   data-link="LINK"        -> button unlocks itself (no other change needed):
 *       - PDFs tab (#worksheets): LINK is the PDF address (cdn.teachermurat.com/....pdf?v=1) or the
 *         full viewer address used on older pages -> opens in the PDF pop-up viewer
 *       - other tabs: LINK is the page address (e.g. ../../activities/un3/g5_un3_act_1.html)
 *   Slide cards (slides pages): <button class="btn is-locked" data-soon="Slide 2" data-link="" data-slide-slot> inside a .card;
 *       a filled link sets the card's data-embed / data-download and turns the button into OPEN.
 *   cdn.teachermurat.com links without ?v= get ?v=1 added automatically.
 *
 * Needs on the page: this script at the end of <body>, and (for PDF buttons) the PDF pop-up with a
 * click handler that listens on the document for .worksheet-btn (delegated).
 */
(function () {
    'use strict';

    var css = [
        '.is-locked{position:relative;background:#EEF2F6!important;border:3px dashed #64748B!important;box-shadow:none!important;color:#3D4852!important;cursor:pointer}',
        '.is-locked:hover,.is-locked:active{transform:none!important;box-shadow:none!important}',
        '.is-locked::after{content:"\\1F512";position:absolute;top:4px;right:8px;font-size:.9rem}',
        '.soon-overlay{display:none;position:fixed;inset:0;background:rgba(20,30,40,.6);z-index:200000;justify-content:center;align-items:center;padding:20px;box-sizing:border-box}',
        '.soon-overlay.open{display:flex}',
        '.soon-box{background:#fff;border:4px solid #334155;border-radius:20px;box-shadow:0 6px 0 #94A3B8;max-width:380px;width:100%;padding:28px 24px 24px;text-align:center;font-family:"Segoe UI",Verdana,Tahoma,Arial,system-ui,sans-serif}',
        '.soon-icon{font-size:3rem;margin-bottom:8px}',
        '.soon-title{font-size:1.375rem;font-weight:800;color:#1A1F23;margin:0 0 8px}',
        '.soon-text{font-size:1.0625rem;font-weight:600;color:#3D4852;margin:0 0 20px;line-height:1.5}',
        '.soon-ok{background:#C2410C;color:#fff;border:3px solid #7C2D12;box-shadow:0 4px 0 #7C2D12;border-radius:12px;font-family:inherit;font-weight:800;font-size:1.0625rem;padding:9px 34px;cursor:pointer}',
        '.soon-ok:active{transform:translateY(2px);box-shadow:none}'
    ].join('\n');

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'soon-overlay';
    overlay.innerHTML =
        '<div class="soon-box" role="dialog" aria-modal="true">' +
        '<div class="soon-icon">🚧</div>' +
        '<p class="soon-title">Yapım Aşamasında</p>' +
        '<p class="soon-text"></p>' +
        '<button type="button" class="soon-ok">Tamam</button>' +
        '</div>';

    function close() { overlay.classList.remove('open'); }

    var VIEWER = 'https://teachermurat.com/pdfjs/web/viewer.html?file=';

    function withVersion(link) {
        if (link.indexOf('cdn.teachermurat.com') !== -1 && link.indexOf('?v=') === -1 && link.indexOf('&v=') === -1) {
            return link + '?v=1';
        }
        return link;
    }

    function unlockFilled() {
        var list = document.querySelectorAll('[data-soon][data-link]');
        for (var i = 0; i < list.length; i++) {
            var el = list[i];
            var link = (el.getAttribute('data-link') || '').replace(/^\s+|\s+$/g, '');
            if (!link) continue;
            if (el.hasAttribute('data-slide-slot') && el.closest && el.closest('.card')) {
                var card = el.closest('.card');
                var plain = link.indexOf(VIEWER) === 0 ? link.slice(VIEWER.length) : withVersion(link);
                card.setAttribute('data-embed', VIEWER + plain);
                card.setAttribute('data-download', plain);
                el.className = 'btn open-modal';
                el.removeAttribute('data-soon');
                el.removeAttribute('data-link');
                el.removeAttribute('data-slide-slot');
                continue;
            }
            var name = el.getAttribute('data-soon');
            var label = el.textContent;
            if (el.closest && el.closest('#worksheets')) {
                var file = link.indexOf(VIEWER) === 0 ? link : VIEWER + withVersion(link);
                el.className = 'card-btn worksheet-btn';
                el.setAttribute('data-embed', file);
                el.setAttribute('data-title', name);
                el.removeAttribute('data-soon');
                el.removeAttribute('data-link');
            } else {
                var a = document.createElement('a');
                a.className = 'card-btn';
                a.href = withVersion(link);
                a.textContent = label;
                el.parentNode.replaceChild(a, el);
            }
        }
    }

    function init() {
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        overlay.querySelector('.soon-ok').addEventListener('click', close);
    }
    function start() { init(); unlockFilled(); }
    if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

    document.addEventListener('click', function (e) {
        var el = e.target.closest ? e.target.closest('[data-soon]') : null;
        if (!el) return;
        e.preventDefault();
        var name = el.getAttribute('data-soon') || 'İçerik';
        overlay.querySelector('.soon-text').textContent =
            '"' + name + '" içeriği yapım aşamasındadır. Çok yakında burada olacak!';
        overlay.classList.add('open');
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
