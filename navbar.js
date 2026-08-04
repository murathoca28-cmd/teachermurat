document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar");
  if (!container) return;

  // 1. Script'in bulunduğu asıl klasörü hatasız bulur (GitHub Pages uyumlu)
  const scriptTag = document.currentScript || document.querySelector('script[src*="navbar.js"]');
  const baseUrl = scriptTag ? new URL('./', scriptTag.src).href : window.location.origin + '/';

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
      /* Şerit Tasarımı (Görselinizdeki arka plan ve alt çizgi) */
      #navbar {
        width: 100%;
        background-color: #eaf3fa; /* Açık mavi şerit rengi */
        border-bottom: 1px solid #c5def5; /* Şerit altındaki ince sınır çizgisi */
        margin: 0;
        padding: 0;
        display: block;
      }
      
      .tm-navbar-container {
        max-width: 1100px; /* Alttaki kartlarla hizalar */
        margin: 0 auto;
        padding: 15px 20px;
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
        gap: 10px; /* Düğmelerin birbirine uzaklığı */
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;
      }
      
      /* Normal Düğme Tasarımı */
      .tm-link {
        text-decoration: none;
        color: #3b698e;
        font-size: 0.95rem;
        font-weight: 600;
        padding: 8px 18px; /* Düğme iç boşluğu */
        border-radius: 25px; /* Düğmeyi hap (pill) şekline sokar */
        transition: all 0.2s ease;
      }
      
      /* Vurgulu (Üzerine gelince veya Aktifken) Düğme Tasarımı */
      .tm-link:hover, .tm-link.active {
        background-color: #9bbce3; /* Buton içi dolgu rengi */
        color: #1a3a5c; /* Buton içi yazı rengi */
      }
    `;
    document.head.appendChild(style);
  }

  const linksHtml = navLinks.map(link => {
    const fullUrl = new URL(link.path, baseUrl).href;
    
    // Aktif sayfayı hatasız tespit etme mantığı
    const isActive = currentUrl === fullUrl || 
      (link.path === 'index.html' && (currentUrl === baseUrl || currentUrl === baseUrl + 'index.html'));

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
