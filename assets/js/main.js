/* ─── Utilities ──────────────────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ─── Nav height ─────────────────────────────────────────────────────────── */
function updateNavHeight() {
  const inner = document.querySelector(".header-inner");
  if (!inner) return;
  document.documentElement.style.setProperty("--nav-height", `${inner.offsetHeight}px`);
}

/* ─── Copy to clipboard with toast ──────────────────────────────────────── */
function setupCopyEmail() {
  const btn = document.querySelector("[data-copy-email]");
  const toast = document.getElementById("copy-toast");
  if (!btn || !toast) return;

  let toastTimer;
  btn.addEventListener("click", () => {
    const email = btn.dataset.copyEmail;
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
    }).catch(() => {
      // Fallback for browsers without clipboard API
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
    });
  });
}

/* ─── Scrollbar fade in/out ──────────────────────────────────────────────── */
function setupScrollbar() {
  let scrollTimer;
  window.addEventListener("scroll", () => {
    document.documentElement.classList.add("is-scrolling");
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.documentElement.classList.remove("is-scrolling");
    }, 1200);
  }, { passive: true });
}

/* ─── Render: nav bar ────────────────────────────────────────────────────── */
function renderNav() {
  document.getElementById("header-slot").innerHTML = `
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <div class="brand">
          <h1>${escapeHtml(siteConfig.name)}</h1>
          <p>${escapeHtml(siteConfig.role)} &middot; ${escapeHtml(siteConfig.clearance)} &middot; ${escapeHtml(siteConfig.location)}</p>
        </div>
        <nav class="nav" id="desktop-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
        </nav>
        <button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Toggle menu">
          <svg class="icon-open"  viewBox="0 0 18 18"><line x1="2" y1="4"  x2="16" y2="4" /><line x1="2" y1="9"  x2="16" y2="9" /><line x1="2" y1="14" x2="16" y2="14"/></svg>
          <svg class="icon-close" viewBox="0 0 18 18"><line x1="3" y1="3"  x2="15" y2="15"/><line x1="15" y1="3" x2="3"  y2="15"/></svg>
        </button>
      </div>
      <nav class="nav-drawer" id="mobile-nav" aria-label="Mobile primary">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
      </nav>
    </header>
  `;
}

/* ─── Render: hero ───────────────────────────────────────────────────────── */
function renderHero() {
  document.getElementById("hero-slot").innerHTML = `
    <section class="hero-section" aria-label="Introduction">
      <div class="hero-card">
        <h2>${escapeHtml(siteConfig.role)}</h2>
        <p>${escapeHtml(siteConfig.intro)}</p>
        <div class="hero-meta">
          <button
            class="pill pill-interactive"
            data-copy-email="${escapeHtml(siteConfig.email)}"
            aria-label="Copy email address"
            title="Click to copy"
          >
            <span>Email</span>
            ${escapeHtml(siteConfig.email)}
            <svg class="pill-icon" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="5" y="5" width="8" height="8" rx="1.5"/>
              <path d="M3 11V3h8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <a
            href="${escapeHtml(siteConfig.certUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="pill pill-interactive"
            title="Verify credential"
          >
            <span>Cert</span>
            ${escapeHtml(siteConfig.certName)}
            <svg class="pill-icon" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M7 3H3.5A1.5 1.5 0 002 4.5v8A1.5 1.5 0 003.5 14h8A1.5 1.5 0 0013 12.5V9" stroke-linecap="round"/>
              <path d="M9 2h5v5" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="14" y1="2" x2="8" y2="8" stroke-linecap="round"/>
            </svg>
          </a>
          <div class="pill"><span>Clearance</span> ${escapeHtml(siteConfig.clearance)}</div>
          <div class="pill"><span>Location</span> ${escapeHtml(siteConfig.location)}</div>
        </div>
      </div>
    </section>
    <div id="copy-toast" class="copy-toast" role="status" aria-live="polite">Email copied!</div>
  `;
}

/* ─── Mobile menu ────────────────────────────────────────────────────────── */
function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const header = document.getElementById("site-header");
  const drawer = document.getElementById("mobile-nav");
  if (!toggle || !header || !drawer) return;

  const open  = () => { header.classList.add("nav-open");    toggle.setAttribute("aria-expanded", "true");  updateNavHeight(); };
  const close = () => { header.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); updateNavHeight(); };

  toggle.addEventListener("click", () => header.classList.contains("nav-open") ? close() : open());
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("click", e => { if (header.classList.contains("nav-open") && !header.contains(e.target)) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ─── Content renderers ──────────────────────────────────────────────────── */
function renderAbout() {
  document.getElementById("about-text").textContent = siteConfig.about;
}

function renderExperience() {
  document.getElementById("experience-list").innerHTML = experienceData.map(job => `
    <article class="job">
      <h3>${escapeHtml(job.role)} &middot; ${escapeHtml(job.company)}</h3>
      <p class="meta">${escapeHtml(job.location)} &ensp;|&ensp; ${escapeHtml(job.dates)}</p>
      <ul>${job.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderProjects() {
  document.getElementById("projects-grid").innerHTML = projectsData.map(p => `
    <article class="card">
      <p class="meta">${escapeHtml(p.category)}</p>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.summary)}</p>
      <ul>${p.notes.map(n => `<li>${escapeHtml(n)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderSkills() {
  document.getElementById("skills-grid").innerHTML = skillsData.map(s => `
    <article class="card skill-card">
      <strong>${escapeHtml(s.title)}</strong>
      <div class="skill-pills">
        ${s.items.map(i => `<span class="skill-pill">${escapeHtml(i)}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderEducation() {
  document.getElementById("education-list").innerHTML = educationData.map(item => `
    <article class="education-item">
      <h3>${escapeHtml(item.degree)} &middot; ${escapeHtml(item.school)}</h3>
      <p class="meta">${escapeHtml(item.location)} &ensp;|&ensp; ${escapeHtml(item.dates)}</p>
      <ul>${item.details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function renderFooter() {
  document.getElementById("footer-slot").innerHTML = `
    <footer class="site-footer">
      <div class="footer-card">
        <span>${escapeHtml(siteConfig.footerNote)}</span>
        <span><a href="mailto:${escapeHtml(siteConfig.email)}">${escapeHtml(siteConfig.email)}</a></span>
      </div>
    </footer>
  `;
}

/* ─── Scroll spy ─────────────────────────────────────────────────────────── */
function setActiveNavLink(id) {
  document.querySelectorAll(".nav a[href^='#'], .nav-drawer a[href^='#']").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  });
}

function setupScrollSpy() {
  const sectionIds = ["about", "experience", "projects", "skills", "education"];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  function getActiveId() {
    const navH = document.querySelector(".header-inner")?.offsetHeight ?? 64;
    const sectionMargin = navH + 24;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    if (window.scrollY >= maxScroll - 1) return sections[sections.length - 1].id;

    const reversed = [...sections].reverse();
    const found = reversed.find(s =>
      window.scrollY >= (s.getBoundingClientRect().top + window.scrollY) - sectionMargin
    );
    return found ? found.id : sections[0].id;
  }

  function onScroll() { setActiveNavLink(getActiveId()); }

  window.addEventListener("scroll",    onScroll, { passive: true });
  window.addEventListener("scrollend", onScroll, { passive: true });
  window.addEventListener("resize", () => { updateNavHeight(); onScroll(); }, { passive: true });
  onScroll();
}

/* ─── Init ───────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderEducation();
  renderFooter();

  updateNavHeight();
  setupMobileMenu();
  setupScrollSpy();
  setupCopyEmail();
  setupScrollbar();
});
