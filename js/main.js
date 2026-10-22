/**
 * ====================================================================
 * MAIN APPLICATION LOGIC — Jhon Villazante Portfolio
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    renderSkills();
    renderProjects();
    initProjectFilters();
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initBackToTop();
    initContactForm();
    initCursorFollower();
    initParticles();
    initYear();
    refreshIcons();
});

window.addEventListener("load", () => {
    refreshIcons();
});

/**
 * --- Preloader Management ---
 */
function initPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    const hide = () => {
        if (!preloader.classList.contains("hidden")) {
            preloader.classList.add("hidden");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 650);
        }
    };

    // Hide once all assets are loaded or after minimum graceful display
    if (document.readyState === "complete") {
        setTimeout(hide, 400);
    } else {
        window.addEventListener("load", () => setTimeout(hide, 400));
    }

    // Safety fallback: guaranteed to never stay stuck
    setTimeout(hide, 1200);
}

/**
 * --- Lucide Icons Refresh Utility ---
 */
function refreshIcons() {
    try {
        if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
            lucide.createIcons();
        }
    } catch (e) {
        console.warn("Lucide icons helper:", e);
    }
}

/**
 * --- Render Skills Section Dynamically ---
 */
function renderSkills() {
    const container = document.getElementById("skills-grid");
    if (!container || !window.PORTFOLIO_DATA || !window.PORTFOLIO_DATA.skills) return;

    container.innerHTML = window.PORTFOLIO_DATA.skills.map((cat, index) => {
        const itemsHtml = cat.items.map(item => `
            <div class="skill-item">
                <span class="skill-item-icon">
                    <i data-lucide="${item.icon}"></i>
                </span>
                <span>${item.name}</span>
            </div>
        `).join("");

        return `
            <div class="skill-category animate-on-scroll" data-animation="fade-up" data-delay="${(index + 1) * 100}">
                <div class="skill-category-header">
                    <div class="skill-category-icon" aria-hidden="true">
                        <i data-lucide="${cat.icon}"></i>
                    </div>
                    <h3 class="skill-category-title">${cat.category}</h3>
                </div>
                <div class="skill-items">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }).join("");

    refreshIcons();
}

/**
 * --- Render Projects Section Dynamically ---
 */
function renderProjects() {
    const container = document.getElementById("projects-grid");
    if (!container || !window.PORTFOLIO_DATA || !window.PORTFOLIO_DATA.projects) return;

    container.innerHTML = window.PORTFOLIO_DATA.projects.map((proj, index) => {
        const categoriesAttr = (proj.categories || [proj.category]).join(" ");
        const tagsHtml = proj.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

        return `
            <article class="project-card animate-on-scroll" data-animation="fade-up" data-delay="${(index % 3 + 1) * 100}" data-categories="${categoriesAttr}" id="${proj.id}">
                <div class="project-card-image">
                    <div class="project-image-placeholder" aria-hidden="true">
                        <i data-lucide="${proj.icon}"></i>
                    </div>
                    <span class="project-category-badge">${proj.categoryLabel}</span>
                </div>
                <div class="project-card-body">
                    <h3 class="project-card-title">${proj.title}</h3>
                    <p class="project-card-description">${proj.description}</p>
                    
                    <div class="project-card-tags">
                        ${tagsHtml}
                    </div>

                    <div class="project-card-actions">
                        ${proj.repoUrl ? `
                            <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-action" aria-label="Ver repositorio de ${proj.title}">
                                <i data-lucide="github" aria-hidden="true"></i>
                                <span>GitHub</span>
                            </a>
                        ` : ""}
                        <span class="project-status-tag" style="margin-left: auto; font-size: 0.75rem; color: var(--color-accent-400); display: inline-flex; align-items: center; gap: 0.35rem;">
                            <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--color-accent-400); display: inline-block;"></span>
                            ${proj.status}
                        </span>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    refreshIcons();
}

/**
 * --- Project Filter Tabs ---
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filterValue = btn.getAttribute("data-filter");

            // Update active state in tabs
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            // Filter items with smooth transition
            cards.forEach(card => {
                const categories = (card.getAttribute("data-categories") || "").split(" ");
                const matches = filterValue === "all" || categories.includes(filterValue);

                if (matches) {
                    card.classList.remove("hidden");
                    setTimeout(() => {
                        card.classList.remove("fade-out");
                        card.classList.add("fade-in");
                    }, 10);
                } else {
                    card.classList.remove("fade-in");
                    card.classList.add("fade-out");
                    setTimeout(() => {
                        card.classList.add("hidden");
                    }, 300);
                }
            });
        });
    });
}

/**
 * --- Navigation: ScrollSpy & Mobile Toggle ---
 */
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const menuLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    // Mobile Hamburger Toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isExpanded));
            navLinks.classList.toggle("active");
            document.body.classList.toggle("menu-open", !isExpanded);
        });

        // Close menu when clicking link
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });
    }

    // ScrollSpy & Sticky Navbar Styling
    const handleScroll = () => {
        const scrollY = window.pageYOffset;

        // Navbar shadow/border on scroll
        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Active section indicator
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            menuLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("data-section") === currentSectionId || link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
}

/**
 * --- Scroll-triggered Entrance Animations ---
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    if (!("IntersectionObserver" in window)) {
        // Fallback: make everything visible immediately
        animatedElements.forEach(el => {
            el.classList.add("visible");
            el.classList.add("animated");
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute("data-delay") || 0;
                setTimeout(() => {
                    entry.target.classList.add("visible");
                    entry.target.classList.add("animated");
                }, parseInt(delay, 10));
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * --- Counter Animations for Hero Stats ---
 */
function initCounterAnimations() {
    const statCounters = document.querySelectorAll(".stat-number[data-count]");
    if (!statCounters.length) return;

    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        statCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-count"), 10);
            const duration = 1400; // ms
            const stepTime = 30;
            const steps = Math.ceil(duration / stepTime);
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    };

    if ("IntersectionObserver" in window) {
        const statsSection = document.querySelector(".hero-stats");
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            }, { threshold: 0.3 });
            observer.observe(statsSection);
        } else {
            setTimeout(animateCounters, 600);
        }
    } else {
        setTimeout(animateCounters, 600);
    }
}

/**
 * --- Back to Top Button ---
 */
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 380) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    }, { passive: true });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * --- Contact Form Handling with Friendly Feedback ---
 */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("form-name");
        const emailInput = document.getElementById("form-email");
        const messageInput = document.getElementById("form-message");

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert("Por favor completa los campos obligatorios del formulario.");
            return;
        }

        const submitBtn = document.getElementById("btn-submit-form");
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;

        setTimeout(() => {
            alert(`¡Gracias por contactarme, ${nameInput.value.trim()}!\n\nEste formulario es una demostración técnica interactiva. Para una comunicación directa, escríbeme a través de mi perfil de LinkedIn o GitHub.`);
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            refreshIcons();
        }, 900);
    });
}

/**
 * --- Cursor Follower Effect (Desktop only) ---
 */
function initCursorFollower() {
    const follower = document.getElementById("cursor-follower");
    if (!follower) return;

    // Only activate for pointer devices with hover capability
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        follower.style.display = "none";
        return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let posX = -100;
    let posY = -100;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const loop = () => {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        follower.style.transform = `translate3d(${posX - 10}px, ${posY - 10}px, 0)`;
        requestAnimationFrame(loop);
    };
    loop();
}

/**
 * --- Subtle Floating Ambient Particles for Hero ---
 */
function initParticles() {
    const container = document.getElementById("particles-container");
    if (!container) return;

    const count = 18;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = "floating-particle";
        const size = Math.random() * 4 + 2; // 2-6px
        const left = Math.random() * 100; // %
        const top = Math.random() * 100; // %
        const duration = Math.random() * 12 + 8; // 8-20s
        const delay = Math.random() * 5; // 0-5s

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(59, 130, 246, ${Math.random() * 0.35 + 0.15});
            left: ${left}%;
            top: ${top}%;
            pointer-events: none;
            animation: floatParticle ${duration}s ease-in-out infinite alternate;
            animation-delay: -${delay}s;
            filter: blur(0.5px);
        `;
        fragment.appendChild(particle);
    }

    container.appendChild(fragment);
}

/**
 * --- Footer Dynamic Year ---
 */
function initYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
