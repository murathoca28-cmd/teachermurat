document.getElementById('navbar-placeholder').innerHTML = `
  <style>
      html {
        overflow-y: scroll;
        scrollbar-gutter: stable;
    }
    .tm-navbar {
      position: fixed; top: 0; left: 0; width: 100%;
      background: #eaf4fb;
      border-bottom: 1px solid #91BCED;
      box-sizing: border-box;
      z-index: 1000;
    }
    .tm-navbar-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tm-logo {
      color: #2c5f8a;
      font-weight: 700;
      font-size: 19px;
    }
    .tm-links { display: flex; gap: 8px; }
    .tm-links a {
      color: #3a6ea5;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 20px;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .tm-links a:hover {
      background: #91BCED;
      color: #1c3f5c;
    }
  </style>
  <div class="tm-navbar">
    <div class="tm-navbar-inner">
      <div class="tm-logo">Teacher Murat</div>
      <div class="tm-links">
        <a href="/teachermurat/index.html">Ana Sayfa</a>
        <a href="/teachermurat/5/grade5.html">Grade 5</a>
        <a href="/teachermurat/6/grade6.html">Grade 6</a>
        <a href="/teachermurat/7/grade7.html">Grade 7</a>
        <a href="/teachermurat/8/grade8.html">Grade 8</a>
      </div>
    </div>
  </div>
  <div style="height:65px;"></div>
`;
