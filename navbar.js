document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar");
  if (!container) return;

  // 1. Script'in çalıştığı dizini otomatik bulma (GitHub Pages uyumu için)
  const scriptTag = document.currentScript || document.querySelector('script[src*="navbar.js"]');
  const baseUrl = scriptTag ? new URL('./', scriptTag.src).href : window.location.origin;

  // 2. Sayfalarınıza ait menü bağlantıları
  const navLinks = [
    { name: "Ana Sayfa", path: "index.html" },
    { name: "Grade 5", path: "grade5.html" },
    { name: "Grade 6", path: "grade6.html" },
    { name: "Grade 7", path: "grade7.html" },
    { name: "Grade 8", path: "grade8.html" }
  ];

  const currentUrl = window.location.href.split('?')[0].split('#')[0];

  // 3. Navbar'ı diğer CSS dosyalarındaki çakışmalardan koruyan sıfırlanmış CSS stili
  const style = document.createElement('style');
  style.textContent = `
    #navbar, #navbar * {
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: inherit;
    }
    .tm-navbar {
      width: 100%;
      background: transparent;
      padding: 20px 40px !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tm-brand {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2b5b84;
      text-decoration: none;
    }
    .tm-menu {
      display: flex;
      gap: 25px;
      list-style: none;
      align-items: center;
    }
    .tm-link {
      text-decoration: none;
      color: #3b698e;
      font-size: 0.95rem;
      font-weight: 600;
      transition: opacity 0.2s;
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

  // 4. HTML içeriğini oluşturma
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
    <header class="tm-navbar">
      <a href="${new URL('index.html', baseUrl).href}" class="tm-brand">Teacher Murat</a>
      <ul class="tm-menu">
        ${linksHtml}
      </ul>
    </header>
  `;
});
