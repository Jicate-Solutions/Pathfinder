<!DOCTYPE html>
<html lang="ta">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Carrer Guidence Workshop</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@300;400;600;700;900&family=Rajdhani:wght@600;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --saffron: #FF6B1A;
    --deep-blue: #0A1628;
    --royal-blue: #1A3A6B;
    --gold: #F5C842;
    --light-gold: #FFE79A;
    --white: #FFFFFF;
    --cream: #FFF8EE;
    --teal: #00C4B4;
    --card-bg: rgba(255,255,255,0.04);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--deep-blue);
    font-family: 'Noto Sans Tamil', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow-x: hidden;
  }

  /* Animated background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(255,107,26,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,196,180,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(26,58,107,0.4) 0%, transparent 70%);
    z-index: 0;
    animation: bgPulse 8s ease-in-out infinite alternate;
  }

  @keyframes bgPulse {
    from { opacity: 0.7; }
    to { opacity: 1; }
  }

  /* Floating dots */
  .dots {
    position: fixed;
    inset: 0;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }
  .dot {
    position: absolute;
    border-radius: 50%;
    animation: floatUp linear infinite;
    opacity: 0;
  }
  @keyframes floatUp {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 0.4; }
    90% { opacity: 0.15; }
    100% { transform: translateY(-10vh) scale(1); opacity: 0; }
  }

  .card {
    position: relative;
    z-index: 1;
    max-width: 680px;
    width: 100%;
    background: linear-gradient(145deg, #0D1F3C 0%, #0A1628 50%, #071220 100%);
    border-radius: 24px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(245,200,66,0.25),
      0 40px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(255,107,26,0.08);
    animation: cardEntry 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
    opacity: 0;
    transform: translateY(40px);
  }

  @keyframes cardEntry {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Top decorative bar */
  .top-bar {
    height: 5px;
    background: linear-gradient(90deg, var(--saffron), var(--gold), var(--teal), var(--gold), var(--saffron));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Header */
  .header {
    padding: 36px 40px 28px;
    text-align: center;
    position: relative;
  }

  .org-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .org-badge {
    background: rgba(245,200,66,0.1);
    border: 1px solid rgba(245,200,66,0.3);
    color: var(--gold);
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-family: 'Rajdhani', sans-serif;
    transition: all 0.3s;
  }
  .org-badge:hover {
    background: rgba(245,200,66,0.2);
    transform: translateY(-2px);
  }
  .org-sep {
    color: rgba(245,200,66,0.3);
    font-size: 16px;
  }

  .event-type {
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 4px;
    color: var(--teal);
    text-transform: uppercase;
    margin-bottom: 10px;
    opacity: 0;
    animation: fadeUp 0.6s 0.4s forwards;
  }

  .main-title {
    font-size: clamp(22px, 5vw, 32px);
    font-weight: 900;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 6px;
    opacity: 0;
    animation: fadeUp 0.6s 0.55s forwards;
  }

  .main-title span {
    color: var(--saffron);
  }

  .subtitle-en {
    font-family: 'Rajdhani', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0;
    animation: fadeUp 0.6s 0.7s forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 40px;
    margin-bottom: 28px;
  }
  .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(245,200,66,0.4), transparent); }
  .divider-icon { color: var(--gold); font-size: 18px; }

  /* Who section */
  .who-section {
    margin: 0 40px 28px;
    background: rgba(255,107,26,0.07);
    border: 1px solid rgba(255,107,26,0.2);
    border-radius: 14px;
    padding: 18px 22px;
    opacity: 0;
    animation: fadeUp 0.6s 0.8s forwards;
  }
  .who-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--saffron);
    text-transform: uppercase;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .who-text {
    font-size: 15px;
    color: rgba(255,255,255,0.85);
    line-height: 1.7;
  }

  /* Topics */
  .topics {
    margin: 0 40px 28px;
    opacity: 0;
    animation: fadeUp 0.6s 0.9s forwards;
  }
  .topics-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--teal);
    text-transform: uppercase;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .topics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  .topic-item {
    background: rgba(0,196,180,0.07);
    border: 1px solid rgba(0,196,180,0.2);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    transition: all 0.3s;
  }
  .topic-item:hover {
    background: rgba(0,196,180,0.14);
    transform: translateY(-2px);
  }
  .topic-icon { font-size: 18px; flex-shrink: 0; }
  .topic-text { font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.4; }

  /* Event details */
  .details-section {
    margin: 0 40px 28px;
    opacity: 0;
    animation: fadeUp 0.6s 1s forwards;
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }

  .detail-card {
    background: var(--card-bg);
    border: 1px solid rgba(245,200,66,0.2);
    border-radius: 14px;
    padding: 16px 14px;
    text-align: center;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .detail-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--saffron));
    opacity: 0;
    transition: opacity 0.3s;
  }
  .detail-card:hover::before { opacity: 1; }
  .detail-card:hover {
    background: rgba(245,200,66,0.08);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .detail-emoji { font-size: 22px; margin-bottom: 8px; display: block; }
  .detail-label {
    font-size: 9px;
    letter-spacing: 2.5px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .detail-value {
    font-size: 14px;
    font-weight: 700;
    color: var(--gold);
    line-height: 1.3;
  }
  .detail-value.big {
    font-size: 16px;
    color: var(--white);
  }

  /* Contact */
  .contact-section {
    margin: 0 40px 28px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    opacity: 0;
    animation: fadeUp 0.6s 1.1s forwards;
    flex-wrap: wrap;
  }
  .contact-label {
    font-size: 10px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    font-family: 'Rajdhani', sans-serif;
    margin-bottom: 4px;
  }
  .contact-email {
    font-size: 13px;
    color: var(--teal);
    font-weight: 600;
    word-break: break-all;
  }
  .contact-icon { font-size: 28px; opacity: 0.6; }

  /* Footer */
  .footer {
    padding: 20px 40px 28px;
    text-align: center;
    opacity: 0;
    animation: fadeUp 0.6s 1.2s forwards;
  }

  .welcome-text {
    font-size: 17px;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    margin-bottom: 14px;
  }
  .welcome-text span { color: var(--saffron); }

  .sign-off {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    line-height: 1.8;
  }
  .sign-off strong {
    color: rgba(255,255,255,0.7);
    font-weight: 600;
  }

  /* Bottom bar */
  .bottom-bar {
    height: 5px;
    background: linear-gradient(90deg, var(--teal), var(--gold), var(--saffron), var(--gold), var(--teal));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite reverse;
  }

  /* Pulse ring decoration */
  .pulse-ring {
    position: absolute;
    top: -60px; right: -60px;
    width: 180px; height: 180px;
    border-radius: 50%;
    border: 1px solid rgba(255,107,26,0.15);
    animation: pulseRing 3s ease-in-out infinite;
  }
  .pulse-ring-2 {
    width: 240px; height: 240px;
    top: -90px; right: -90px;
    border-color: rgba(245,200,66,0.08);
    animation-delay: 1.5s;
  }
  @keyframes pulseRing {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 1; }
  }

  @media (max-width: 500px) {
    .header, .who-section, .topics, .details-section, .contact-section, .footer {
      padding-left: 20px !important; padding-right: 20px !important;
      margin-left: 20px !important; margin-right: 20px !important;
    }
    .topics-grid { grid-template-columns: 1fr; }
    .details-grid { grid-template-columns: 1fr; }
    .org-logos { gap: 8px; }
  }
</style>
</head>
<body>

<!-- Floating dots background -->
<div class="dots" id="dots"></div>

<div class="card">
  <div class="top-bar"></div>

  <div class="header">
    <!-- Decorative circles -->
    <div class="pulse-ring"></div>
    <div class="pulse-ring pulse-ring-2"></div>

    <div class="org-logos">
      <span class="org-badge">JKKN Institutions</span>
      <span class="org-sep">✦</span>
      <span class="org-badge">CDC</span>
      <span class="org-sep">✦</span>
      <span class="org-badge">Yi – Young Indians</span>
    </div>

    <div class="event-type">அன்புடன் அழைக்கிறோம்</div>
    <h1 class="main-title">கேரியர் <span>வழிகாட்டும்</span><br>ரோட்ஷோ</h1>
    <div class="subtitle-en">Career Guidance Roadshow 2026</div>
  </div>

  <div class="divider">
    <div class="divider-line"></div>
    <div class="divider-icon">✦</div>
    <div class="divider-line"></div>
  </div>

  <div class="who-section">
    <div class="who-label">யாருக்கு?</div>
    <div class="who-text">
      12-ம் வகுப்பு தேர்ச்சி பெற்ற <strong style="color:var(--gold)">மாணவர்கள்</strong> மற்றும் அவர்களது <strong style="color:var(--gold)">பெற்றோர்களுக்கு</strong> — எடப்பாடி மற்றும் சுற்றுவட்டார பகுதிகளிலிருந்து.
    </div>
  </div>

  <div class="topics">
    <div class="topics-label">நிகழ்வில் பேசப்படும் தலைப்புகள்</div>
    <div class="topics-grid">
      <div class="topic-item">
        <span class="topic-icon">🎓</span>
        <span class="topic-text">தமிழ்நாடு கல்லூரி சேர்க்கை வழிகாட்டுதல்</span>
      </div>
      <div class="topic-item">
        <span class="topic-icon">📚</span>
        <span class="topic-text">சரியான பாடப்பிரிவு தேர்வு</span>
      </div>
      <div class="topic-item">
        <span class="topic-icon">🤖</span>
        <span class="topic-text">AI சார்ந்த எதிர்கால தொழில் வாய்ப்புகள்</span>
      </div>
    </div>
  </div>

  <div class="details-section">
    <div class="details-grid">
      <div class="detail-card">
        <span class="detail-emoji">📅</span>
        <div class="detail-label">நாள்</div>
        <div class="detail-value big">12 ஜூன் 2026</div>
        <div class="detail-value" style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:3px;">Friday</div>
      </div>
      <div class="detail-card">
        <span class="detail-emoji">🕥</span>
        <div class="detail-label">நேரம்</div>
        <div class="detail-value big">காலை 10:30</div>
        <div class="detail-value" style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:3px;">10:30 AM onwards</div>
      </div>
      <div class="detail-card">
        <span class="detail-emoji">📍</span>
        <div class="detail-label">இடம்</div>
        <div class="detail-value big">எடப்பாடி</div>
        <div class="detail-value" style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:3px;">Community Hall</div>
      </div>
    </div>
  </div>

  <div class="contact-section">
    <span class="contact-icon">✉️</span>
    <div style="flex:1">
      <div class="contact-label">தொடர்புக்கு / For Enquiries</div>
      <div class="contact-email">ceo.office@jkkn.ac.in</div>
    </div>
  </div>

  <div class="footer">
    <div class="welcome-text">உங்கள் வருகையை <span>எதிர்பார்க்கிறோம்!</span></div>
    <div class="sign-off">
      நன்றியுடன்,<br>
      <strong>நிர்வாகம், JKKN Institutions · CDC · Yi</strong>
    </div>
  </div>

  <div class="bottom-bar"></div>
</div>

<script>
  // Generate floating dots
  const dotsContainer = document.getElementById('dots');
  const colors = ['rgba(255,107,26,0.5)', 'rgba(245,200,66,0.4)', 'rgba(0,196,180,0.4)', 'rgba(255,255,255,0.2)'];
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    const size = Math.random() * 5 + 2;
    dot.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*14+8}s;
      animation-delay:${Math.random()*8}s;
    `;
    dotsContainer.appendChild(dot);
  }
</script>
</body>
</html>