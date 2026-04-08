/* ─── Utilities ──────────────────────────────────────────────────────────── */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ─── Shared header offset ───────────────────────────────────────────────── */
/* Single source of truth for all scroll-related offsets.
   Must match CSS: scroll-margin-top: calc(var(--nav-height) + 20px) */
function getHeaderOffset() {
  const header = document.querySelector(".header-inner");
  const navHeight = header?.offsetHeight ?? 64;
  const extraSpacing = 20;
  return navHeight + extraSpacing;
}

/* ─── Nav height ─────────────────────────────────────────────────────────── */
/* Measures .header-inner (not full header) to avoid growth from mobile drawer.
   Only updates --nav-height. Offset math is handled via getHeaderOffset(). */
function updateNavHeight() {
  const inner = document.querySelector(".header-inner");
  if (!inner) return;
  document.documentElement.style.setProperty("--nav-height", `${inner.offsetHeight}px`);
}

/* ─── Render: nav bar only ───────────────────────────────────────────────── */
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
          <a href="mailto:${escapeHtml(siteConfig.email)}" class="pill">
            <span>Email</span> ${escapeHtml(siteConfig.email)}
          </a>
          <div class="pill"><span>Location</span> ${escapeHtml(siteConfig.location)}</div>
          <div class="pill"><span>Clearance</span> ${escapeHtml(siteConfig.clearance)}</div>
          <a href="https://cp.certmetrics.com/CompTIA/en/public/verify/credential/E54S9W85M2F4QVWC" target="_blank" rel="noopener noreferrer" class="pill">
            <span>Cert</span> CompTIA Security+
          </a>
        </div>
      </div>
    </section>
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
      <ul>${s.items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
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

/* ─── Scroll spy (IntersectionObserver) ─────────────────────────────────── */
function setActiveNavLink(id) {
  document.querySelectorAll(".nav a[href^='#'], .nav-drawer a[href^='#']").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  });
}

function setupScrollSpy() {
  const sectionIds = ["about", "experience", "projects", "skills", "education"];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  let suppressSpy = false;
  let observer;

  function createObserver() {
    if (observer) observer.disconnect();

    const offset = getHeaderOffset();

    observer = new IntersectionObserver((entries) => {
      if (suppressSpy) return;

      // Find the entry closest to the top that is intersecting
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveNavLink(visible[0].target.id);
      }
    }, {
      root: null,

      // Top band just below header, bottom trimmed so only one section dominates
      rootMargin: `-${offset + 1}px 0px -70% 0px`,

      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  function handleBottomEdge() {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    const nearBottom = scrollY + viewportH >= docH - 8;

    if (nearBottom) {
      const lastSection = sections[sections.length - 1];
      setActiveNavLink(lastSection.id);
    }
  }

  document.querySelectorAll(".nav a[href^='#'], .nav-drawer a[href^='#']").forEach(a => {
    a.addEventListener("click", () => {
      const id = a.getAttribute("href").slice(1);

      setActiveNavLink(id);
      suppressSpy = true;

      const release = () => {
        suppressSpy = false;
        window.removeEventListener("wheel", release);
        window.removeEventListener("touchstart", release);
        window.removeEventListener("keydown", release);
      };

      window.addEventListener("wheel", release, { passive: true, once: true });
      window.addEventListener("touchstart", release, { passive: true, once: true });
      window.addEventListener("keydown", release, { once: true });

      setTimeout(() => {
        suppressSpy = false;
      }, 400);
    });
  });

  window.addEventListener("resize", () => {
    updateNavHeight();
    createObserver(); // recalc rootMargin
  }, { passive: true });
  window.addEventListener("scroll", handleBottomEdge, { passive: true });

  createObserver();
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
});