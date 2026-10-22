/**
 * Jhon Villazante - Portfolio Interactive Enhancements
 * Features:
 * - Dynamic Scrollspy on sidebar navigation
 * - Minimalist Fullscreen Image Lightbox
 * - Native Scroll Reveal (Fade-up animations)
 * - Back to Top floating button
 * - CV download handler & WhatsApp integration
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DYNAMIC SCROLLSPY
       ========================================================================== */
    const navLinks = document.querySelectorAll('.sidebar-nav-list a[href^="#"]');
    const sections = [];

    navLinks.forEach(link => {
        const id = link.getAttribute('href').substring(1);
        const section = document.getElementById(id);
        if (section) {
            sections.push({ id, link, el: section });
        }
    });

    const updateScrollspy = () => {
        const scrollPos = window.scrollY + 140; // Offset for header trigger
        let currentSectionId = '';

        sections.forEach(({ id, el }) => {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = id;
            }
        });

        // Fallback for top of page
        if (window.scrollY < 200 && sections.length > 0) {
            currentSectionId = sections[0].id;
        }

        // Fallback for bottom of page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && sections.length > 0) {
            currentSectionId = sections[sections.length - 1].id;
        }

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateScrollspy, { passive: true });
    updateScrollspy();

    // Smooth Scroll on Sidebar Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    /* ==========================================================================
       2. MINIMALIST IMAGE LIGHTBOX MODAL
       ========================================================================== */
    // Ensure lightbox markup exists
    let lightbox = document.getElementById('image-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.className = 'lightbox-overlay';
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Cerrar visor">&times;</button>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="Vista previa en pantalla completa">
                <div id="lightbox-caption" class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const openLightbox = (imgSrc, imgAlt) => {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt || 'Plano de ingeniería / detalle';
        lightboxCaption.textContent = imgAlt || '';
        lightboxCaption.style.display = imgAlt ? 'block' : 'none';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => {
            lightboxImg.src = '';
        }, 250);
    };

    // Attach click to engineering plans, diagrams, and project images
    const zoomableImages = document.querySelectorAll('.media-container img, .promo-showcase-card img, .company-logo-wrap img');
    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt || img.title || '');
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ==========================================================================
       3. BACK TO TOP FLOATING BUTTON
       ========================================================================== */
    let backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.className = 'back-to-top-btn';
        backToTopBtn.setAttribute('aria-label', 'Volver al inicio');
        backToTopBtn.setAttribute('title', 'Volver al inicio');
        backToTopBtn.innerHTML = `
            <svg viewBox="0 0 24 24" class="btt-svg">
                <path d="m18 15-6-6-6 6"/>
            </svg>
            <span>Subir</span>
        `;
        document.body.appendChild(backToTopBtn);
    }

    const toggleBackToTop = () => {
        if (window.scrollY > 450) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       4. SCROLL REVEAL (FADE-UP ANIMATIONS)
       ========================================================================== */
    const revealTargets = document.querySelectorAll(
        '.media-container, .company-card, .experience-card, .service-card, .promo-showcase-card, .software-group-card, .author-watermark, section > h2'
    );

    revealTargets.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for legacy browsers
        revealTargets.forEach(el => el.classList.add('revealed'));
    }

    /* ==========================================================================
       5. CV DOWNLOAD HANDLER (GRACEFUL FALLBACK)
       ========================================================================== */
    const btnCv = document.getElementById('btn-download-cv');
    if (btnCv) {
        btnCv.addEventListener('click', (e) => {
            // Check if href is pointing to local file
            const cvPath = 'assets/docs/CV_Jhon_Villazante.pdf';
            fetch(cvPath, { method: 'HEAD' })
                .then(res => {
                    if (res.ok) {
                        window.open(cvPath, '_blank');
                    } else {
                        // Toast notification or WhatsApp fallback
                        showNotification(
                            '📄 El archivo de CV se está actualizando. Puedes solicitar el CV actualizado directamente a Jhon vía WhatsApp o LinkedIn.',
                            'info'
                        );
                    }
                })
                .catch(() => {
                    showNotification(
                        '📄 Puedes solicitar el CV actualizado directamente a Jhon vía WhatsApp o LinkedIn.',
                        'info'
                    );
                });
        });
    }

    function showNotification(msg, type = 'info') {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #0f172a;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 13px;
            z-index: 10002;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25);
            border: 1px solid #334155;
            max-width: 90vw;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        notif.textContent = msg;
        document.body.appendChild(notif);
        setTimeout(() => notif.style.opacity = '1', 50);
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 4000);
    }
});
