/* ============================================================================
   SVG-спрайт лендинга — symbol-дефиниции 1:1 из G-Track Landing.html.
   Монтируется один раз в начале страницы; иконки используются через
   <use href="#i-..." />.
   ============================================================================ */

export function LandingIcons() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></symbol>
        <symbol id="i-truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></symbol>
        <symbol id="i-trailer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="15" height="10" rx="1" /><circle cx="7" cy="18.5" r="1.6" /><circle cx="12" cy="18.5" r="1.6" /><path d="M17 11h5" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></symbol>
        <symbol id="i-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></symbol>
        <symbol id="i-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5" /></symbol>
        <symbol id="i-upload" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></symbol>
        <symbol id="i-board" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 3v18" /></symbol>
        <symbol id="i-folder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></symbol>
        <symbol id="i-send" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></symbol>
        <symbol id="i-receipt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M8 7h8" /><path d="M8 11h8" /></symbol>
        <symbol id="i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></symbol>
        <symbol id="i-package" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="M3.27 6.96 12 12.01l8.73-5.05" /><path d="M12 22.08V12" /></symbol>
        <symbol id="i-infinity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16c-2.2 0-4-1.8-4-4s1.8-4 4-4c3 0 4.5 2 6 4s3 4 6 4c2.2 0 4-1.8 4-4s-1.8-4-4-4c-3 0-4.5 2-6 4s-3 4-6 4Z" /></symbol>
        <symbol id="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></symbol>
        <symbol id="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></symbol>
        <symbol id="i-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" /><circle cx="12" cy="12" r="3" /></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></symbol>
        <symbol id="i-zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></symbol>
        <symbol id="i-cursor" viewBox="0 0 24 24"><path fill="#FFFFFF" stroke="#1A1D21" strokeWidth="1.4" strokeLinejoin="round" d="M5 3l13 7.6-5.6 1.4 2.8 6.1-2.9 1.3-2.8-6.1L5 17.5z" /></symbol>
        <symbol id="i-trucksil" viewBox="0 0 40 20" fill="currentColor"><path d="M1 3.5h21a1 1 0 0 1 1 1V14H1z" /><path d="M25 7h5.2a2 2 0 0 1 1.5.68l3.8 3.4a2 2 0 0 1 .5 1.32V14H25z" /><circle cx="8" cy="16" r="2.4" /><circle cx="16" cy="16" r="2.4" /><circle cx="30.5" cy="16" r="2.4" /></symbol>
        <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18" /></symbol>
        <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></symbol>

        {/* ---- флаги переключателя языка (viewBox 3:2, заливки — не currentColor) ---- */}
        <symbol id="f-gb" viewBox="0 0 60 40"><path d="M0 0h60v40H0z" fill="#012169" /><path d="M0 0 60 40M60 0 0 40" fill="none" stroke="#fff" strokeWidth="8" /><path d="M0 0 60 40M60 0 0 40" fill="none" stroke="#C8102E" strokeWidth="3.2" /><path d="M30 0v40M0 20h60" fill="none" stroke="#fff" strokeWidth="13.3" /><path d="M30 0v40M0 20h60" fill="none" stroke="#C8102E" strokeWidth="8" /></symbol>
        <symbol id="f-ru" viewBox="0 0 3 2"><path d="M0 0h3v2H0z" fill="#fff" /><path d="M0 .667h3v1.333H0z" fill="#0039A6" /><path d="M0 1.333h3v.667H0z" fill="#D52B1E" /></symbol>
        <symbol id="f-de" viewBox="0 0 3 2"><path d="M0 0h3v2H0z" fill="#000" /><path d="M0 .667h3v1.333H0z" fill="#D00" /><path d="M0 1.333h3v.667H0z" fill="#FFCE00" /></symbol>
        <symbol id="f-fr" viewBox="0 0 3 2"><path d="M0 0h1v2H0z" fill="#0055A4" /><path d="M1 0h1v2H1z" fill="#fff" /><path d="M2 0h1v2H2z" fill="#EF4135" /></symbol>
        <symbol id="f-cz" viewBox="0 0 3 2"><path d="M0 0h3v1H0z" fill="#fff" /><path d="M0 1h3v1H0z" fill="#D7141A" /><path d="M0 0 1.5 1 0 2z" fill="#11457E" /></symbol>
        <symbol id="f-pl" viewBox="0 0 3 2"><path d="M0 0h3v1H0z" fill="#fff" /><path d="M0 1h3v1H0z" fill="#DC143C" /></symbol>
        <symbol id="f-it" viewBox="0 0 3 2"><path d="M0 0h1v2H0z" fill="#009246" /><path d="M1 0h1v2H1z" fill="#fff" /><path d="M2 0h1v2H2z" fill="#CE2B37" /></symbol>
        <symbol id="f-lv" viewBox="0 0 3 2"><path d="M0 0h3v2H0z" fill="#9E3039" /><path d="M0 .8h3v.4H0z" fill="#fff" /></symbol>
        <symbol id="f-lt" viewBox="0 0 3 2"><path d="M0 0h3v2H0z" fill="#FDB913" /><path d="M0 .667h3v1.333H0z" fill="#006A44" /><path d="M0 1.333h3v.667H0z" fill="#C1272D" /></symbol>
        <symbol id="f-ua" viewBox="0 0 3 2"><path d="M0 0h3v1H0z" fill="#0057B7" /><path d="M0 1h3v1H0z" fill="#FFD700" /></symbol>
        <symbol id="f-es" viewBox="0 0 3 2"><path d="M0 0h3v2H0z" fill="#AA151B" /><path d="M0 .5h3v1H0z" fill="#F1BF00" /></symbol>
        <symbol id="f-ro" viewBox="0 0 3 2"><path d="M0 0h1v2H0z" fill="#002B7F" /><path d="M1 0h1v2H1z" fill="#FCD116" /><path d="M2 0h1v2H2z" fill="#CE1126" /></symbol>
      </defs>
    </svg>
  );
}
