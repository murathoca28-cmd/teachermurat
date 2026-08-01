(function injectBackground() {
    function addBg() {
        // 1. Arka plan stilini (CSS) otomatik ekler
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

        // 2. Saydam Vektör Arka Planı Ekranın Arkasına Ekler
        const bgContainer = document.createElement('div');
        bgContainer.className = 'bg-svg-container';
        bgContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
                <defs>
                    <linearGradient id="grad-bubble1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#4ECDC4" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#5563FF" stop-opacity="0.85"/>
                    </linearGradient>
                    <linearGradient id="grad-bubble2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#FF6B6B" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#FF8E53" stop-opacity="0.85"/>
                    </linearGradient>
                    <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#F77F00" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#FCFF44" stop-opacity="0.85"/>
                    </linearGradient>
                    <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#A8E063" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#56AB76" stop-opacity="0.85"/>
                    </linearGradient>
                    <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="1" dy="2" stdDeviation="3" flood-opacity="0.08"/>
                    </filter>
                </defs>

                <!-- SOL ÜST: Big Ben & HELLO! Balonu -->
                <g transform="translate(70, 70)" opacity="0.38" filter="url(#soft-shadow)">
                    <path d="M 50,190 L 50,80 L 60,60 L 60,25 L 65,10 L 70,25 L 70,60 L 80,80 L 80,190 Z" fill="none" stroke="#2c3e50" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="65" cy="95" r="10" fill="#fff" stroke="#2c3e50" stroke-width="2"/>
                    <line x1="65" y1="95" x2="65" y2="89" stroke="#2c3e50" stroke-width="2"/>
                    <line x1="65" y1="95" x2="69" y2="95" stroke="#2c3e50" stroke-width="2"/>
                    <rect x="90" y="15" width="90" height="38" rx="12" fill="url(#grad-bubble1)"/>
                    <path d="M 100,53 L 93,63 L 112,53 Z" fill="url(#grad-bubble1)"/>
                    <text x="135" y="39" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">HELLO!</text>
                </g>

                <!-- SAĞ ÜST: Dünya Küresi -->
                <g transform="translate(1200, 70)" opacity="0.38" filter="url(#soft-shadow)">
                    <circle cx="70" cy="70" r="45" fill="#e0f7fa" stroke="#00acc1" stroke-width="2.5"/>
                    <path d="M 35,60 Q 55,45 80,50 T 110,65" fill="none" stroke="#4db6ac" stroke-width="2.5"/>
                    <path d="M 45,85 Q 70,100 100,80" fill="none" stroke="#4db6ac" stroke-width="2.5"/>
                    <circle cx="70" cy="70" r="45" fill="none" stroke="#00acc1" stroke-width="2.5"/>
                    <path d="M 70,25 A 45 45 0 0 0 70,115" fill="none" stroke="#00acc1" stroke-width="1.5" stroke-dasharray="3,3"/>
                    <line x1="70" y1="145" x2="70" y2="140" stroke="#455a64" stroke-width="3.5"/>
                    <path d="M 50,140 L 90,140" stroke="#455a64" stroke-width="3.5" stroke-linecap="round"/>
                </g>

                <!-- Kağıt Uçak ve Yol -->
                <g transform="translate(820, 90)" opacity="0.35">
                    <path d="M -160,60 Q -80,15 0,40 T 150,15" fill="none" stroke="#5563FF" stroke-width="2" stroke-dasharray="5,5"/>
                    <path d="M 150,15 L 185,0 L 172,24 L 160,18 Z" fill="#5563FF"/>
                    <path d="M 185,0 L 142,8 L 160,18 Z" fill="#3f51b5"/>
                    <rect x="30" y="-15" width="80" height="34" rx="10" fill="url(#grad-bubble2)"/>
                    <path d="M 55,19 L 50,28 L 65,19 Z" fill="url(#grad-bubble2)"/>
                    <text x="70" y="7" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">SPEAK!</text>
                </g>

                <!-- SOL ALT: Açık Kitap, Kalem & READ! -->
                <g transform="translate(90, 600)" opacity="0.38" filter="url(#soft-shadow)">
                    <path d="M 20,60 Q 55,45 90,60 L 90,110 Q 55,95 20,110 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
                    <path d="M 90,60 Q 125,45 160,60 L 160,110 Q 125,95 90,110 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
                    <line x1="32" y1="72" x2="78" y2="64" stroke="#90a4ae" stroke-width="1.8"/>
                    <line x1="32" y1="84" x2="78" y2="76" stroke="#90a4ae" stroke-width="1.8"/>
                    <line x1="102" y1="64" x2="148" y2="72" stroke="#90a4ae" stroke-width="1.8"/>
                    <line x1="102" y1="76" x2="148" y2="84" stroke="#90a4ae" stroke-width="1.8"/>
                    <g transform="translate(165, 30) rotate(-30)">
                        <rect x="0" y="0" width="12" height="55" rx="2" fill="#FFC107" stroke="#333" stroke-width="1.8"/>
                        <polygon points="0,55 6,70 12,55" fill="#d7ccc8" stroke="#333" stroke-width="1.8"/>
                        <polygon points="4,64 6,70 8,64" fill="#333"/>
                        <rect x="0" y="-10" width="12" height="10" rx="2" fill="#e91e63" stroke="#333" stroke-width="1.8"/>
                    </g>
                    <rect x="10" y="-5" width="75" height="34" rx="10" fill="url(#grad-green)"/>
                    <path d="M 35,29 L 30,38 L 45,29 Z" fill="url(#grad-green)"/>
                    <text x="47.5" y="17" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">READ!</text>
                </g>

                <!-- SAĞ ALT: Mezuniyet Kepı & WRITE! -->
                <g transform="translate(1180, 600)" opacity="0.38" filter="url(#soft-shadow)">
                    <polygon points="60,25 110,45 60,65 10,45" fill="#2c3e50"/>
                    <rect x="30" y="52" width="60" height="25" rx="4" fill="#34495e"/>
                    <path d="M 102,48 L 114,72 L 110,88" fill="none" stroke="#f1c40f" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="110" cy="90" r="3.5" fill="#f1c40f"/>
                    <rect x="5" y="-30" width="80" height="34" rx="10" fill="url(#grad-yellow)"/>
                    <path d="M 40,4 L 48,13 L 55,4 Z" fill="url(#grad-yellow)"/>
                    <text x="45" y="-8" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#2c3e50" text-anchor="middle">WRITE!</text>
                </g>

                <!-- HARFLER VE SAYILAR -->
                <g font-family="'Segoe UI', sans-serif" font-weight="900" opacity="0.18">
                    <text x="180" y="310" font-size="44" fill="#FF6B6B" transform="rotate(-15 180 310)">A</text>
                    <text x="250" y="440" font-size="38" fill="#5563FF" transform="rotate(12 250 440)">B</text>
                    <text x="170" y="540" font-size="42" fill="#4ECDC4" transform="rotate(-20 170 540)">C</text>
                    
                    <text x="1220" y="270" font-size="40" fill="#F77F00" transform="rotate(15 1220 270)">1</text>
                    <text x="1170" y="400" font-size="46" fill="#56AB76" transform="rotate(-10 1170 400)">2</text>
                    <text x="1240" y="510" font-size="40" fill="#FF8E53" transform="rotate(18 1240 510)">3</text>
                </g>

                <!-- YILDIZLAR -->
                <g fill="#FFD700" opacity="0.20">
                    <polygon points="310,150 314,162 326,162 316,170 320,182 310,174 300,182 304,170 294,162 306,162" />
                    <polygon points="1120,170 1124,180 1134,180 1126,186 1129,196 1120,190 1111,196 1114,186 1106,180 1116,180" />
                    <polygon points="230,730 233,740 243,740 235,746 238,756 230,750 222,756 225,746 217,740 227,740" />
                    <polygon points="1080,720 1084,732 1096,732 1086,740 1090,752 1080,744 1070,752 1074,740 1064,732 1076,732" />
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
