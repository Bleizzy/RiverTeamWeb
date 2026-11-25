const PAGES = [
    { id: "home",     href: "index.html",    label: "Главная" },
    { id: "projects", href: "projects.html", label: "Проекты" },
    { id: "team",     href: "team.html",     label: "Команда" },
    { id: "plans",    href: "plans.html",    label: "Планы" }
];

function applyGlobalColors() {
    document.documentElement.style.setProperty("--accent-rgb", siteColors.accentRgb);
}

function renderLayout() {
    const current = document.body.dataset.page;
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");

    if (header) {
        header.className = "header";
        header.innerHTML = `
            <div class="container header-inner">
                <a href="index.html" class="logo">RIVER<span class="dot">.</span></a>
                <nav class="nav-island" id="nav-island">
                    ${PAGES.map(p => `<a href="${p.href}" class="nav-link${p.id === current ? " active" : ""}">${p.label}</a>`).join("")}
                </nav>
                <div class="header-right">
                    <a href="https://t.me/riverteam_off" class="social-icon telegram-btn" target="_blank" rel="noopener" aria-label="Telegram">
                        <img class="gray-icon" src="img/icons/telegram_gray.webp" alt="Telegram">
                        <img class="color-icon" src="img/icons/telegram_color.webp" alt="Telegram">
                    </a>
                    <button class="burger" id="burger" aria-label="Меню"><span></span><span></span></button>
                </div>
            </div>`;
        document.getElementById("burger").addEventListener("click", () => {
            document.getElementById("nav-island").classList.toggle("open");
        });
    }

    if (footer) {
        footer.className = "footer";
        footer.innerHTML = `
            <div class="container footer-inner">
                <div class="footer-left">
                    <a href="index.html" class="logo">RIVER<span class="dot">.</span></a>
                    <span class="slogan">Создаём. Развиваем. Играем.</span>
                </div>
                <div class="footer-socials">
                    <a href="https://t.me/riverteam_off" class="social-icon telegram-btn" target="_blank" rel="noopener" aria-label="Telegram">
                        <img class="gray-icon" src="img/icons/telegram_gray.webp" alt="Telegram">
                        <img class="color-icon" src="img/icons/telegram_color.webp" alt="Telegram">
                    </a>
                </div>
            </div>`;
    }
}

function projectCardHTML(project) {
    const cardRgb = project.cardRgb || "185, 28, 56";
    const statusRgb = project.statusRgb || siteColors.devStatusRgb;
    const link = project.link || "#";
    const bg = project.image
        ? `background-image: linear-gradient(to right, rgba(12, 13, 15, 0.92) 30%, rgba(12, 13, 15, 0.4)), url('${project.image}'); background-size: cover; background-position: center;`
        : "";
    return `
        <article class="project-card" style="--card-rgb: ${cardRgb}; ${bg}">
            <a href="${link}" class="card-overlay" aria-label="${project.title}"></a>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="status-badge" style="--status-rgb: ${statusRgb};">
                    <span class="status-dot"></span>${project.statusText}
                </div>
            </div>
            <span class="circle-arrow card-arrow">→</span>
        </article>`;
}

function teamCardHTML(member) {
    const rgb = member.rgb || "255, 255, 255";
    const avatar = member.avatar
        ? `<img src="${member.avatar}" alt="${member.name}" class="member-avatar">`
        : `<div class="initials">${member.initials}</div>`;
    return `
        <div class="team-card" style="--member-rgb: ${rgb};">
            ${avatar}
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
        </div>`;
}

function futureCardHTML(item) {
    const cardRgb = item.cardRgb || "110, 56, 180";
    const statusRgb = item.statusRgb || siteColors.planStatusRgb;
    const icon = item.image
        ? `<img src="${item.image}" alt="${item.title}" class="future-img">`
        : `<div class="future-star">✦</div>`;
    return `
        <article class="future-card" style="--card-rgb: ${cardRgb};">
            ${icon}
            <div class="future-info"><h3>${item.title}</h3><p>${item.description}</p></div>
            <div class="status-badge" style="--status-rgb: ${statusRgb};">
                <span class="status-dot"></span>${item.statusText}
            </div>
        </article>`;
}

function renderList(id, items, htmlFn, emptyText) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = items.length ? items.map(htmlFn).join("") : `<p class="empty">${emptyText}</p>`;
}

function normalizeGallery(g) {
    if (!g) return [];
    const list = Array.isArray(g) ? g : [g];
    return list
        .map(item => typeof item === "string" ? { src: item, caption: "" } : item)
        .filter(item => item && item.src);
}

function galleryHTML(items, title) {
    return `
        <div class="gallery count-${Math.min(items.length, 3)}" id="gallery">
            ${items.map((it, i) => `
                <button type="button" class="gallery-item" data-index="${i}" aria-label="Открыть: ${it.caption || title}">
                    <img src="${it.src}" alt="${it.caption || title}" loading="lazy">
                    ${it.caption ? `<span class="gallery-caption">${it.caption}</span>` : ""}
                </button>`).join("")}
        </div>`;
}

/* Просмотр картинок на весь экран */
function initLightbox(items) {
    const gallery = document.getElementById("gallery");
    if (!gallery || !items.length) return;

    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `
        <button class="lb-close" aria-label="Закрыть">✕</button>
        <button class="lb-nav lb-prev" aria-label="Назад">←</button>
        <figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>
        <button class="lb-nav lb-next" aria-label="Вперёд">→</button>
        <div class="lb-count"></div>`;
    document.body.appendChild(box);

    const img = box.querySelector(".lb-img");
    const cap = box.querySelector(".lb-cap");
    const count = box.querySelector(".lb-count");
    let index = 0;

    function show(i) {
        index = (i + items.length) % items.length;
        img.src = items[index].src;
        cap.textContent = items[index].caption || "";
        count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : "";
        box.classList.toggle("single", items.length < 2);
    }
    const open = i => { show(i); box.classList.add("open"); document.documentElement.style.overflow = "hidden"; };
    const close = () => { box.classList.remove("open"); document.documentElement.style.overflow = ""; };

    gallery.addEventListener("click", e => {
        const btn = e.target.closest(".gallery-item");
        if (btn) open(Number(btn.dataset.index));
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
    box.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
    box.addEventListener("click", e => { if (e.target === box || e.target.classList.contains("lb-figure")) close(); });
    document.addEventListener("keydown", e => {
        if (!box.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
    });
    let touchX = null;
    box.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
        touchX = null;
    });
}

function renderProjectPage() {
    const root = document.getElementById("project-root");
    if (!root) return;

    const slug = new URLSearchParams(location.search).get("p");
    const project = projectsData.find(p => p.slug === slug);

    if (!project) {
        root.innerHTML = `
            <div class="not-found">
                <h1>Режим не найден</h1>
                <p>Такого проекта нет в списке.</p>
                <a href="projects.html" class="pill-btn"><span>Все проекты</span><span class="arrow">→</span></a>
            </div>`;
        document.title = "Режим не найден — River Team";
        return;
    }

    document.title = `${project.title} — River Team`;
    const cardRgb = project.cardRgb || "185, 28, 56";
    const statusRgb = project.statusRgb || siteColors.devStatusRgb;
    const members = (project.team || [])
        .map(name => teamData.find(m => m.name === name))
        .filter(Boolean);
    const gallery = normalizeGallery(project.gallery);
    const idx = projectsData.indexOf(project);
    const next = projectsData[(idx + 1) % projectsData.length];

    const facts = [
        ["Жанр", project.genre], ["Версия", project.version]
    ].filter(f => f[1]);

    root.innerHTML = `
        <a href="projects.html" class="back-link"><span class="circle-arrow">←</span><span>Все проекты</span></a>

        <section class="project-hero" style="--card-rgb: ${cardRgb};
            background-image: linear-gradient(to top, rgba(9,10,10,0.95) 10%, rgba(9,10,10,0.35)), url('${project.image}');">
            <div class="status-badge" style="--status-rgb: ${statusRgb};"><span class="status-dot"></span>${project.statusText}</div>
            <h1>${project.title}</h1>
            <p>${project.description}</p>
        </section>

        <div class="project-layout">
            <div class="project-main">
                <div class="section-title-wrap"><span class="red-dash"></span><h2>О режиме</h2></div>
                <p class="project-about">${project.about || ""}</p>

                ${gallery.length ? `
                <div class="section-title-wrap sub"><span class="red-dash"></span><h2>Галерея</h2></div>
                ${galleryHTML(gallery, project.title)}` : ""}
            </div>

            <aside class="project-side">
                <div class="side-card">
                    ${facts.map(f => `<div class="fact"><span>${f[0]}</span><b>${f[1]}</b></div>`).join("")}
                </div>
                ${members.length ? `
                <div class="side-card">
                    <div class="side-title">Над режимом работали</div>
                    ${members.map(m => `
                        <div class="mini-member" style="--member-rgb: ${m.rgb};">
                            <img src="${m.avatar}" alt="${m.name}">
                            <div><b>${m.name}</b><span>${m.role}</span></div>
                        </div>`).join("")}
                </div>` : ""}
                ${(project.links || []).length ? `
                <div class="side-card">
                    ${project.links.map(l => `<a class="pill-btn wide" href="${l.url}" target="_blank" rel="noopener"><span>${l.label}</span><span class="arrow">→</span></a>`).join("")}
                </div>` : ""}
            </aside>
        </div>

        ${projectsData.length > 1 ? `
        <a href="project.html?p=${next.slug}" class="next-project">
            <span>Следующий режим</span><b>${next.title} →</b>
        </a>` : ""}`;

    initLightbox(gallery);
}

const LOADER_MIN_MS = 700;
const LOADER_MAX_MS = 6000;

function collectImageUrls() {
    const urls = new Set(["img/icons/telegram_gray.webp", "img/icons/telegram_color.webp"]);
    projectsData.forEach(p => { if (p.image) urls.add(p.image); (p.gallery || []).forEach(g => urls.add(g)); });
    teamData.forEach(m => { if (m.avatar) urls.add(m.avatar); });
    futureProjectsData.forEach(f => { if (f.image) urls.add(f.image); });
    return [...urls];
}

function loadImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = src;
    });
}

function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const fill = document.getElementById("loader-fill");
    const started = performance.now();

    const tasks = [
        document.fonts ? document.fonts.load("16px fontmain", "RIVER.").catch(() => {}) : Promise.resolve(),
        new Promise(res => document.readyState === "complete" ? res() : window.addEventListener("load", res, { once: true })),
        ...collectImageUrls().map(loadImage)
    ];

    let done = 0;
    tasks.forEach(t => t.then(() => {
        done++;
        if (fill) fill.style.width = Math.round((done / tasks.length) * 100) + "%";
    }));

    const finish = () => {
        loader.classList.add("hide");
        setTimeout(() => loader.remove(), 600);
    };
    const minWait = new Promise(res => setTimeout(res, LOADER_MIN_MS));
    const maxWait = new Promise(res => setTimeout(res, LOADER_MAX_MS));

    Promise.race([Promise.all([...tasks, minWait]), maxWait]).then(() => {
        if (fill) fill.style.width = "100%";
        setTimeout(finish, 150);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    applyGlobalColors();
    renderLayout();
    renderList("projects-container", projectsData, projectCardHTML, "Здесь пока пусто");
    renderList("team-container", teamData, teamCardHTML, "Здесь пока пусто");
    renderList("future-container", futureProjectsData, futureCardHTML, "Здесь пока пусто");
    renderProjectPage();
    initLoader();
});
