document.getElementById('navbar-placeholder').innerHTML = `
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
  html {
    overflow-y: scroll;
    scrollbar-gutter: stable;
  }
  .tm-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    z-index: 1000;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }
  .tm-navbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
  }
  .tm-logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e3a5f;
    letter-spacing: -0.5px;
    white-space: nowrap;
  }
  .tm-links {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .tm-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 18px;
    min-width: 95px;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    color: #2c5282;
    border-radius: 8px;
    transition: all 0.25s ease;
    white-space: nowrap;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
  }
  .tm-links a:hover {
    background: #ebf4ff;
    color: #1a365d;
    border-color: #bee3f8;
  }
  .tm-links a.active {
    background: #2b6cb0;
    color: #ffffff;
    border-color: #2b6cb0;
  }
  /* Mobil hamburger menü */
  .tm-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 8px;
    border: none;
    background: transparent;
  }
  .tm-hamburger span {
    display: block;
    width: 24px;
    height: 2.5px;
    background: #2c5282;
    margin: 3px 0;
    border-radius: 2px;
    transition: 0.3s ease;
  }
  @media (max-width: 768px) {
    .tm-links {
      position: fixed;
      top: 64px;
      left: 0;
      width: 100%;
      background: #ffffff;
      flex-direction: column;
      gap: 2px;
      padding: 12px 0;
      box-shadow: 0 6px 12px rgba(0,0,0,0.05);
      transform: translateY(-120%);
      transition: transform 0.3s ease;
      z-index: 999;
    }
    .tm-links.open {
      transform: translateY(0);
    }
    .tm-hamburger {
      display: flex;
    }
    .tm-links a {
      width: 100%;
      justify-content: center;
      border-radius: 0;
      min-width: unset;
      height: 48px;
      font-size: 1rem;
    }
  }

  /* Modal stilleri */
  .tm-soon-modal {
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 2000;
    align-items: center;
    justify-content: center;
  }
  .tm-soon-modal.open {
    display: flex;
  }
  .tm-soon-modal-content {
    background: white;
    border-radius: 20px;
    padding: 30px 25px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  .tm-soon-modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #d35400;
    margin-bottom: 15px;
  }
  .tm-soon-modal-text {
    font-size: 1rem;
    color: #555;
    margin-bottom: 25px;
  }
  .tm-soon-modal-btn {
    background: #f39c12;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .tm-soon-modal-btn:hover {
    background: #d68910;
  }
</style>

<div class="tm-navbar">
  <div class="tm-navbar-inner">
    <div class="tm-logo">Teacher Murat</div>
    <button class="tm-hamburger" id="hamburger-btn" aria-label="Menü">
      <span></span><span></span><span></span>
    </button>
    <div class="tm-links" id="nav-links">
      <a href="/index.html">Ana Sayfa</a>
      <a href="/5/grade5.html">Grade 5</a>
      <a href="javascript:void(0)" id="grade6-link">Grade 6</a>
      <a href="/7/grade7.html">Grade 7</a>
      <a href="/8/grade8.html">Grade 8</a>
    </div>
  </div>
</div>

<!-- Yakında modal -->
<div class="tm-soon-modal" id="soonModal">
  <div class="tm-soon-modal-content">
    <div class="tm-soon-modal-title">📢 Yakında!</div>
    <div class="tm-soon-modal-text">Grade 6 içeriği çok yakında eklenecek. 😊</div>
    <button class="tm-soon-modal-btn" id="closeSoonModal">Tamam</button>
  </div>
</div>
`;

// Hamburger menü işlevselliği
document.addEventListener('click', function(e) {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('nav-links');
  if (!btn || !nav) return;
  if (e.target.closest('#hamburger-btn')) {
    nav.classList.toggle('open');
  } else if (!e.target.closest('#nav-links') && nav.classList.contains('open')) {
    nav.classList.remove('open');
  }
});

// Grade 6 linki için modal açma
const soonModal = document.getElementById('soonModal');
const closeSoonBtn = document.getElementById('closeSoonModal');

document.getElementById('grade6-link').addEventListener('click', function() {
  soonModal.classList.add('open');
});

closeSoonBtn.addEventListener('click', function() {
  soonModal.classList.remove('open');
});

// Modal dışına tıklayınca kapat (opsiyonel)
soonModal.addEventListener('click', function(e) {
  if (e.target === soonModal) soonModal.classList.remove('open');
});
