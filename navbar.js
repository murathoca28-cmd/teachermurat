document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar");
  if (!container) return;

  const scriptTag = document.currentScript || document.querySelector('script[src*="navbar.js"]');
  const baseUrl = scriptTag ? new URL('./', scriptTag.src).href : window.location.origin;

  const navLinks = [
    { name: "Ana Sayfa", path: "index.html" },
    { name: "Grade 5", path: "5/grade5.html" },
    { name: "Grade 6", path: "6/grade6.html" },
    { name: "Grade 7", path: "7/grade7.html" },
    { name: "Grade 8", path: "8/grade8.html" }
  ];

  const currentUrl = window.location.href.split('?')[0].split('#')[0];

  if (!document.getElementById("tm-navbar-styles")) {
    const style = document.createElement('style');
    style.id = "tm-navbar-styles";
    style.textContent = `
      #navbar {
        position: absolute !important; /* Menüyü sayfa akışından koparır */
        top: 0 !important;             /* Tarayıcının en tepesine çiviler */
        left: 0 !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        z-index: 9999;                 /* Her şeyin üstünde görünmesini sağlar */
      }
      .tm-navbar-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 25px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
      }
      .tm-brand {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2b5b84;
        text-decoration: none;
        white-space: nowrap;
      }
      .tm-menu {
        display: flex;
        gap: 28px;
        list-style: none;
        margin: 0 !important;
        padding: 0 !important;
        align-items: center;
      }
      .tm-link {
        text-decoration: none;
        color: #3b698e;
        font-size: 0.95rem;
        font-weight: 600;
        transition: opacity 0.2s;
        white-space: nowrap;
      }
      .tm-link:hover {
        opacity: 0.75;
      }
      .tm-link.active {
        color: #1a3a5c;
        font-weight: 700;
      }
    `;
    document.head.appendChild(style);
  }

  const linksHtml = navLinks.map(link => {
    const fullUrl = new URL(link.path, baseUrl).href;
    const isActive = currentUrl === fullUrl || 
      (link.path === 'index.html' && currentUrl.replace(/\/$/, '') === baseUrl.replace(/\/$/, ''));

    return `
      <li>
        <a href="${fullUrl}" class="tm-link ${isActive ? 'active' : ''}">
          ${link.name}
        </a>
      </li>
    `;
  }).join('');

  container.innerHTML = `
    <header class="tm-navbar-container">
      <a href="${new URL('index.html', baseUrl).href}" class="tm-brand">Teacher Murat</a>
      <ul class="tm-menu">
        ${linksHtml}
      </ul>
    </header>
  `;
});
