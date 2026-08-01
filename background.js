(function injectBackground() {
    function addBg() {
        // 1. CSS Stillerini Otomatik Ekleme
        const style = document.createElement('style');
        style.innerHTML = `
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100vh;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background: radial-gradient(circle at center, #ffffff 0%, #CDEFFF 100%) !important;
                position: relative;
                overflow-x: hidden;
            }
            .bg-svg-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            }
            body > *:not(.bg-svg-container) {
                position: relative;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);

        // 2. İçeriğe Özel Vektör Arka Planı Ekleme
        const bgContainer = document.createElement('div');
        bgContainer.className = 'bg-svg-container';
        bgContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                <defs>
                    <linearGradient id="grad-bubble1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#FF6B6B" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#FF8E53" stop-opacity="0.85"/>
                    </linearGradient>
                    <linearGradient id="grad-bubble2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#5563FF" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#4ECDC4" stop-opacity="0.85"/>
                    </linearGradient>
                    <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#A8E063" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#56AB76" stop-opacity="0.85"/>
                    </linearGradient>
                    <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#F77F00" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#FCFF44" stop-opacity="0.85"/>
                    </linearGradient>
                    <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.08"/>
                    </filter>
                </defs>

                <!-- SOL ÜST: TESTS & QUIZZES (Test Kağıdı & A+) -->
                <g transform="translate(70, 65)" opacity="0.38" filter="url(#soft-shadow)">
                    <!-- Test Kağıdı -->
                    <rect x="20" y="20" width="65" height="85" rx="6" fill="#ffffff" stroke="#2c3e50" stroke-width="2.5"/>
                    <line x1="32" y1="40" x2="60" y2="40" stroke="#90a4ae" stroke-width="2" stroke-linecap="round"/>
                    <line x1="32" y1="52" x2="55" y2="52" stroke="#90a4ae" stroke-width="2" stroke-linecap="round"/>
                    <line x1="32" y1="64" x2="65" y2="64" stroke="#90a4ae" stroke-width="2" stroke-linecap="round"/>
                    <!-- Onay İşaretleri (Checkmarks) -->
                    <path d="M 70,38 L 73,42 L 79,35" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
                    <path d="M 65,50 L 68,54 L 74,47" fill="none" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
                    <!-- A+ Rozeti -->
                    <text x="68" y="90" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="20" fill="#e53935">A+</text>
                    <!-- Balon "TESTS!" -->
                    <rect x="95" y="25" width="85" height="36" rx="10" fill="url(#grad-bubble1)"/>
                    <path d="M 105,61 L 98,70 L 115,61 Z" fill="url(#grad-bubble1)"/>
                    <text x="137.5" y="48" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">TESTS!</text>
                </g>

                <!-- SAĞ ÜST: PRESENTATIONS (Sunum Ekranı & Ampul) -->
                <g transform="translate(1200, 65)" opacity="0.38" filter="url(#soft-shadow)">
                    <!-- Projeksiyon / Sunum Tahtası -->
                    <rect x="20" y="20" width="80" height="55" rx="4" fill="#ffffff" stroke="#2c3e50" stroke-width="2.5"/>
                    <line x1="60" y1="75" x2="60" y2="105" stroke="#455a64" stroke-width="3"/>
                    <path d="M 45,105 L 75,105" stroke="#455a64" stroke-width="3" stroke-linecap="round"/>
                    <!-- Grafikten Çizgi -->
                    <path d="M 32,58 L 48,45 L 60,50 L 78,32" fill="none" stroke="#5563FF" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="78" cy="32" r="3" fill="#5563FF"/>
                    <!-- Balon "PRESENT!" -->
                    <rect x="-70" y="20" width="80" height="36" rx="10" fill="url(#grad-bubble2)"/>
                    <path d="M -5,35 L 5,42 L -2,48 Z" fill="url(#grad-bubble2)"/>
                    <text x="-30" y="43" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">SLIDES!</text>
                </g>

                <!-- SOL ALT: WORKSHEETS (Çalışma Altlığı & Kalem) -->
                <g transform="translate(80, 610)" opacity="0.38" filter="url(#soft-shadow)">
                    <!-- Panoluk (Clipboard) -->
                    <rect x="20" y="20" width="70" height="90" rx="6" fill="#ffffff" stroke="#2c3e50" stroke-width="2.5"/>
                    <rect x="42" y="14" width="26" height="10" rx="2" fill="#78909c" stroke="#2c3e50" stroke-width="1.5"/>
                    <!-- Çizgiler -->
                    <line x1="32" y1="38" x2="78" y2="38" stroke="#b0bec5" stroke-width="2"/>
                    <line x1="32" y1="50" x2="78" y2="50" stroke="#b0bec5" stroke-width="2"/>
                    <line x1="32" y1="62" x2="78" y2="62" stroke="#b0bec5" stroke-width="2"/>
                    <line x1="32" y1="74" x2="65" y2="74" stroke="#b0bec5" stroke-width="2"/>
                    <!-- Kalem -->
                    <g transform="translate(95, 35) rotate(25)">
                        <rect x="0" y="0" width="10" height="50" rx="2" fill="#FFC107" stroke="#333" stroke-width="1.5"/>
                        <polygon points="0,50 5,62 10,50" fill="#d7ccc8" stroke="#333" stroke-width="1.5"/>
                        <polygon points="3,56 5,62 7,56" fill="#333"/>
                    </g>
                    <!-- Balon "WORKSHEETS!" -->
                    <rect x="10" y="-20" width="100" height="34" rx="10" fill="url(#grad-green)"/>
                    <path d="M 35,14 L 30,22 L 45,14 Z" fill="url(#grad-green)"/>
                    <text x="60" y="2" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">WORKSHEETS!</text>
                </g>

                <!-- SAĞ ALT: GAMES & ACTIVITIES (Gamepad, Zar & Yapboz) -->
                <g transform="translate(1180, 610)" opacity="0.38" filter="url(#soft-shadow)">
                    <!-- Gamepad Konsol -->
                    <rect x="20" y="35" width="80" height="48" rx="18" fill="#34495e"/>
                    <!-- Yön Tuşları (D-Pad) -->
                    <path d="M 38,53 H 46 V 65 H 38 Z M 34,57 H 50 V 61 H 34 Z" fill="#ffffff"/>
                    <!-- Aksiyon Tuşları -->
                    <circle cx="78" cy="53" r="3.5" fill="#FF6B6B"/>
                    <circle cx="86" cy="59" r="3.5" fill="#4ECDC4"/>
                    <circle cx="70" cy="59" r="3.5" fill="#FCFF44"/>
                    <circle cx="78" cy="65" r="3.5" fill="#5563FF"/>
                    <!-- Balon "GAMES!" -->
                    <rect x="10" y="-15" width="80" height="34" rx="10" fill="url(#grad-yellow)"/>
                    <path d="M 45,19 L 52,27 L 58,19 Z" fill="url(#grad-yellow)"/>
                    <text x="50" y="7" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#2c3e50" text-anchor="middle">GAMES!</text>
                </g>

                <!-- SÜZÜLEN ETKİNLİK SİMGELERİ (Soru İşaretleri, Zarlar & Yıldızlar) -->
                <g font-family="'Segoe UI', sans-serif" font-weight="900" opacity="0.18">
                    <!-- Soru İşaretleri -->
                    <text x="220" y="300" font-size="45" fill="#FF6B6B" transform="rotate(-15 220 300)">?</text>
                    <text x="1230" y="320" font-size="42" fill="#5563FF" transform="rotate(15 1230 320)">?</text>

                    <!-- Oyun Zarı 1 -->
                    <g transform="translate(240, 440) rotate(15)">
                        <rect x="0" y="0" width="30" height="30" rx="5" fill="none" stroke="#2c3e50" stroke-width="2.5"/>
                        <circle cx="8" cy="8" r="2.5" fill="#2c3e50"/>
                        <circle cx="15" cy="15" r="2.5" fill="#2c3e50"/>
                        <circle cx="22" cy="22" r="2.5" fill="#2c3e50"/>
                    </g>
                    <!-- Yapboz Parçası İllüstrasyonu -->
                    <g transform="translate(1160, 440) rotate(-20)">
                        <path d="M 0,0 H 25 V 8 A 5,5 0 0,1 25,18 V 25 H 0 Z" fill="none" stroke="#56AB76" stroke-width="2.5"/>
                    </g>
                </g>

                <!-- YILDIZLAR -->
                <g fill="#FFD700" opacity="0.22">
                    <polygon points="310,150 314,162 326,162 316,170 320,182 310,174 300,182 304,170 294,162 306,162" />
                    <polygon points="1120,170 1124,180 1134,180 1126,186 1129,196 1120,190 1111,196 1114,186 1106,180 1116,180" />
                    <polygon points="210,730 214,740 224,740 216,746 219,756 210,750 202,756 205,746 197,740 207,740" />
                    <polygon points="1100,720 1104,732 1116,732 1106,740 1110,752 1100,744 1090,752 1094,740 1084,732 1096,732" />
                </g>
            </svg>
        `;

        document.body.insertBefore(bgContainer, document.body.firstChild);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", addBg);
    } else {
        addBg();
    }
})();
