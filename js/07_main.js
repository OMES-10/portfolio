/**
 * SEG3525 – Devoir 1 · Portfolio
 * FICHIER 07 : JavaScript – Interactions de la page
 * ──────────────────────────────────────────────────────────────────
 * Ce fichier ajoute des comportements interactifs minimes :
 *   1. Navbar qui devient opaque au défilement
 *   2. Défilement doux vers les ancres
 *   3. Animation d'apparition des éléments (IntersectionObserver)
 *   4. Indicateur de progression de lecture
 *
 * AUCUNE dépendance externe. Fonctionne avec Bootstrap 5.
 */

// ══════════════════════════════════════════════════════════════════
// 1. NAVBAR – opacité au scroll
// ══════════════════════════════════════════════════════════════════
/**
 * Quand l'utilisateur défile de plus de 50px,
 * on ajoute la classe "scrolled" à la navbar.
 * Le CSS correspondant est dans 02_style.css → #main-nav.scrolled
 */
const navbar = document.getElementById('main-nav');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });  // { passive: true } = meilleure performance
}


// ══════════════════════════════════════════════════════════════════
// 2. LIEN ACTIF dans la navbar selon la section visible
// ══════════════════════════════════════════════════════════════════
/**
 * On observe quelle section est visible à l'écran.
 * On met à jour le lien de navigation correspondant.
 *
 * IntersectionObserver est la manière moderne (sans jQuery ni scroll events
 * répétés) de détecter qu'un élément entre dans la fenêtre.
 */
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Retirer .active de tous les liens
        navLinks.forEach(link => link.classList.remove('active'));

        // Ajouter .active au lien correspondant à la section visible
        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',  // La section est "active" quand elle est au milieu de l'écran
    threshold: 0
  }
);

sections.forEach(section => sectionObserver.observe(section));


// ══════════════════════════════════════════════════════════════════
// 3. ANIMATION D'APPARITION (fade-in au scroll)
// ══════════════════════════════════════════════════════════════════
/**
 * Les éléments avec la classe .animate-on-scroll apparaissent
 * progressivement quand ils entrent dans la fenêtre.
 *
 * Comment l'utiliser dans votre HTML :
 *   <div class="animate-on-scroll">...</div>
 *
 * Le CSS pour l'animation initiale (caché) doit être dans style.css :
 *   .animate-on-scroll         { opacity: 0; transform: translateY(30px); transition: ... }
 *   .animate-on-scroll.visible { opacity: 1; transform: translateY(0);    }
 */

// Ajouter le CSS d'animation dynamiquement si ce n'est pas dans style.css
const animStyle = document.createElement('style');
animStyle.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);  // N'observer qu'une seule fois
      }
    });
  },
  { threshold: 0.15 }
);

// Appliquer l'animation aux cartes de projet et aux feature-cards
document.querySelectorAll('.case-card, .feature-card, .stat-card').forEach(el => {
  el.classList.add('animate-on-scroll');
  animObserver.observe(el);
});


// ══════════════════════════════════════════════════════════════════
// 4. BARRE DE PROGRESSION DE LECTURE (optionnel, visuellement attrayant)
// ══════════════════════════════════════════════════════════════════
/**
 * Une fine barre colorée en haut de la page qui avance
 * au fur et à mesure que l'utilisateur lit.
 */

// Créer l'élément HTML de la barre
const progressBar = document.createElement('div');
progressBar.id = 'reading-progress';
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: #E94F37;
  z-index: 9999;
  transition: width 0.1s ease;
  border-radius: 0 2px 2px 0;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${scrollPercent}%`;
}, { passive: true });


// ══════════════════════════════════════════════════════════════════
// 5. FERMER LE MENU HAMBURGER après clic sur un lien (mobile)
// ══════════════════════════════════════════════════════════════════
/**
 * Sur mobile, le menu reste ouvert après avoir cliqué un lien.
 * Ce code le ferme automatiquement.
 */
const navCollapse = document.getElementById('navMenu');

if (navCollapse) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Utiliser l'API Bootstrap pour fermer le collapse
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}


// ══════════════════════════════════════════════════════════════════
// 6. LOG DE DÉMARRAGE (aide au débogage)
// ══════════════════════════════════════════════════════════════════
console.log('%c SEG3525 Portfolio chargé ✓ ', 'background:#E94F37;color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px;');
console.log('Sections détectées :', sections.length);
console.log('Liens nav détectés :', navLinks.length);
