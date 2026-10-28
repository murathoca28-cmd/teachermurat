/*! pdf-download.js — direct download for PDF links that point to another address (cdn.teachermurat.com)
 *
 * Browsers ignore the "download" attribute on cross-origin links and open the PDF in a tab instead.
 * This script catches clicks on  <a download href="...pdf">  links, fetches the file and saves it directly.
 * If that is not possible (network / CORS problem) the link works the old way (opens the PDF).
 *
 * Usage: add  <script src="/pdf-download.js"></script>  before </body>. Works for links added later by scripts, too.
 */
(function () {
    'use strict';

    document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        var a = e.target.closest ? e.target.closest('a[download][href]') : null;
        if (!a) return;

        var url;
        try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
        if (url.origin === location.origin) return;            // same address: the browser downloads it natively
        if (!/\.pdf$/i.test(url.pathname)) return;

        e.preventDefault();
        if (a._tmBusy) return;
        a._tmBusy = true;
        a.style.opacity = '0.65';
        a.setAttribute('aria-busy', 'true');

        var name = a.getAttribute('download') || decodeURIComponent(url.pathname.split('/').pop() || 'document.pdf');

        function done() {
            a._tmBusy = false;
            a.style.opacity = '';
            a.removeAttribute('aria-busy');
        }

        fetch(url.href, { mode: 'cors' })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.blob(); })
            .then(function (blob) {
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = name;
                document.body.appendChild(link);
                link.click();
                setTimeout(function () { URL.revokeObjectURL(link.href); link.remove(); }, 1500);
                done();
            })
            .catch(function () {
                done();
                window.open(url.href, '_blank', 'noopener');  // fallback: open the PDF
            });
    });
})();
