/* =========================================================
   BizMax Solutions — Site Script
   ========================================================= */
(function () {
    'use strict';

    /** Single business WhatsApp number (international format, no "+"). */
    const WHATSAPP_NUMBER = '94742327807';

    const buildWhatsAppUrl = (message) =>
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    /* -----------------------------------------------------
       1. Mobile navigation drawer
       ----------------------------------------------------- */
    const initMobileMenu = () => {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.getElementById('site-nav');
        if (!toggle || !nav) return;

        const backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);

        const setOpen = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            nav.classList.toggle('is-open', open);
            backdrop.classList.toggle('is-visible', open);
            document.body.classList.toggle('menu-open', open);
        };

        toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
        backdrop.addEventListener('click', () => setOpen(false));
        nav.addEventListener('click', (event) => {
            if (event.target.closest('a')) setOpen(false);
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                setOpen(false);
                toggle.focus();
            }
        });
        window.matchMedia('(min-width: 961px)').addEventListener('change', (mq) => {
            if (mq.matches) setOpen(false);
        });
    };

    /* -----------------------------------------------------
       2. Pre-filled WhatsApp links
       Any <a data-wa-message="..."> gets a full wa.me link.
       The plain href stays as a no-JS fallback.
       ----------------------------------------------------- */
    const initWhatsAppLinks = () => {
        document.querySelectorAll('a[data-wa-message]').forEach((link) => {
            link.href = buildWhatsAppUrl(link.dataset.waMessage);
        });
    };

    /* -----------------------------------------------------
       3. Contact form → WhatsApp (with validation)
       ----------------------------------------------------- */
    const validators = {
        name: (value) => (value.length >= 2 ? '' : 'Please enter your full name.'),
        business: (value) => (value.length >= 2 ? '' : 'Please enter your business or page name.'),
        service: (value) => (value ? '' : 'Please choose what you need.'),
    };

    const setFieldError = (field, message) => {
        const errorEl = document.getElementById(`${field.id}-error`);
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (errorEl) errorEl.textContent = message;
    };

    const initLeadForm = () => {
        const form = document.getElementById('leadForm');
        if (!form) return;

        const status = form.querySelector('.form-status');
        const fields = Array.from(form.querySelectorAll('[data-validate]'));

        const validateField = (field) => {
            const value = field.value.trim();
            const message = validators[field.dataset.validate](value);
            setFieldError(field, message);
            return message === '';
        };

        fields.forEach((field) => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.getAttribute('aria-invalid') === 'true') validateField(field);
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            status.textContent = '';

            const invalid = fields.filter((field) => !validateField(field));
            if (invalid.length) {
                invalid[0].focus();
                return;
            }

            const value = (name) => form.elements[name].value.trim();
            const message = [
                'Hi BizMax Solutions, I would like a free audit.',
                '',
                `Name: ${value('fullName')}`,
                `Business / Page: ${value('businessName')}`,
                `Interested in: ${value('service')}`,
            ].join('\n');

            const url = buildWhatsAppUrl(message);
            // Note: passing 'noopener' makes window.open return null, so detach manually.
            const opened = window.open(url, '_blank');
            if (opened) {
                opened.opener = null;
            } else {
                window.location.href = url; // popup blocked → same-tab fallback
            }

            status.textContent = 'Opening WhatsApp… just press send and we will reply within 2 hours.';
            form.reset();
        });
    };

    /* -----------------------------------------------------
       4. Pre-select a service in the lead form
       Links like <a href="#contact" data-select-service="Web Development">
       ----------------------------------------------------- */
    const initServicePreselect = () => {
        const select = document.getElementById('service');
        if (!select) return;
        document.querySelectorAll('[data-select-service]').forEach((link) => {
            link.addEventListener('click', () => {
                select.value = link.dataset.selectService;
            });
        });
    };

    /* -----------------------------------------------------
       5. Scroll reveal + number count-up
       <dl data-reveal> ... <span data-count="6" data-from="0">6</span>
       Final numbers are in the HTML, so nothing breaks without JS.
       ----------------------------------------------------- */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const countUp = (el) => {
        const to = Number(el.dataset.count);
        const from = Number(el.dataset.from || 0);
        const duration = 1600;
        const start = performance.now();
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = String(Math.round(from + (to - from) * easeOut(progress)));
            if (progress < 1) requestAnimationFrame(tick);
        };
        el.textContent = String(from);
        requestAnimationFrame(tick);
    };

    const initReveal = () => {
        const groups = document.querySelectorAll('[data-reveal]');
        if (!groups.length) return;
        if (reduceMotion || !('IntersectionObserver' in window)) {
            groups.forEach((g) => g.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                entry.target.querySelectorAll('[data-count]').forEach(countUp);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.35 });
        groups.forEach((g) => observer.observe(g));
    };

    document.documentElement.classList.add('js');

    document.addEventListener('DOMContentLoaded', () => {
        initMobileMenu();
        initWhatsAppLinks();
        initLeadForm();
        initServicePreselect();
        initReveal();
    });
})();
