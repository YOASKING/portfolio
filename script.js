/**
 * Portfolio Yoas Paul-Christ — logique JavaScript
 */

(function () {
  "use strict";

  /* ---------- Navigation mobile ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav-principale");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Année footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Particules (léger) ---------- */
  var particlesRoot = document.getElementById("particles");
  if (particlesRoot && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    var count = Math.min(28, Math.floor(window.innerWidth / 45));
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 18 + "s";
      p.style.animationDuration = 14 + Math.random() * 12 + "s";
      particlesRoot.appendChild(p);
    }
  }

  /* ---------- Barres de compétences (IntersectionObserver) ---------- */
  var skillBars = document.querySelectorAll(".skill");
  if ("IntersectionObserver" in window && skillBars.length) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var bar = entry.target.querySelector(".skill__bar");
            var level = bar && bar.getAttribute("data-level");
            if (level) {
              entry.target.style.setProperty("--level", level + "%");
            }
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    skillBars.forEach(function (el) {
      obs.observe(el);
    });
  } else {
    skillBars.forEach(function (el) {
      var bar = el.querySelector(".skill__bar");
      var level = bar && bar.getAttribute("data-level");
      if (level) el.style.setProperty("--level", level + "%");
      el.classList.add("is-visible");
    });
  }

  /* ---------- Données veille (simulées) ---------- */
  var NEWS = [
    {
      id: "1",
      title: "Les entreprises françaises accélèrent l’adoption de l’IA générative",
      summary:
        "Les équipes IT intègrent des assistants dans les flux métiers, avec un accent sur la gouvernance des données et la traçabilité.",
      source: "VeilleTech FR",
      category: "ia",
      tag: "Intelligence artificielle",
    },
    {
      id: "2",
      title: "Nouvelles recommandations sur la résilience des chaînes logicielles",
      summary:
        "Les guides insistent sur la signature des artefacts, des SBOM et des déploiements progressifs pour limiter les risques supply-chain.",
      source: "CyberPulse",
      category: "cyber",
      tag: "Cybersécurité",
    },
    {
      id: "3",
      title: "Capacités d’inférence : vers des modèles compacts sur le périmètre",
      summary:
        "Quantification et optimisation permettent de réduire la latence pour des cas d’usage temps réel en entreprise.",
      source: "InnovationLab",
      category: "innov",
      tag: "Innovations tech",
    },
    {
      id: "4",
      title: "Cadre européen : transparence et évaluation des risques pour l’IA à haut impact",
      summary:
        "Documentation technique, tests adverses et supervision humaine sont au cœur des exigences pour les systèmes critiques.",
      source: "PolicyWatch EU",
      category: "risques",
      tag: "Risques & avancées IA",
    },
    {
      id: "5",
      title: "Phishing assisté par IA : sensibilisation et détection renforcées",
      summary:
        "Les équipes SOC combinent règles heuristiques et modèles pour repérer des contenus générés de manière synthétique.",
      source: "SecOps Mag",
      category: "cyber",
      tag: "Cybersécurité",
    },
    {
      id: "6",
      title: "Multimodalité : agents qui relient texte, image et documents internes",
      summary:
        "Les projets pilotes visent à réduire la friction entre bases documentaires et interfaces conversationnelles.",
      source: "AI Trends",
      category: "ia",
      tag: "Intelligence artificielle",
    },
    {
      id: "7",
      title: "Durabilité du numérique : mesurer l’empreinte des workloads",
      summary:
        "Les équipes plateforme croisent métriques d’utilisation et sources d’énergie pour prioriser l’efficacité.",
      source: "GreenTech",
      category: "innov",
      tag: "Innovations tech",
    },
    {
      id: "8",
      title: "Biais et équité : jeux de tests et red teaming systématiques",
      summary:
        "Les organisations formalisent des protocoles pour détecter les dérives avant mise en production.",
      source: "Ethics AI",
      category: "risques",
      tag: "Risques & avancées IA",
    },
  ];

  var currentFilter = "tous";
  var newsGrid = document.getElementById("news-grid");
  var shuffleBtn = document.getElementById("shuffle-news");
  var filterBtns = document.querySelectorAll(".filter-btn");
  var veilleStatus = document.getElementById("veille-status");

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function formatTime() {
    var d = new Date();
    return d.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function renderNews() {
    if (!newsGrid) return;

    var list = NEWS.filter(function (n) {
      return currentFilter === "tous" || n.category === currentFilter;
    });
    list = shuffleArray(list);

    newsGrid.innerHTML = "";
    list.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "news-card glass-panel";
      card.setAttribute("data-id", item.id);

      card.innerHTML =
        '<div class="news-card__top">' +
        '<span class="news-card__tag">' +
        escapeHtml(item.tag) +
        "</span>" +
        '<time class="news-card__time" datetime="">' +
        escapeHtml(formatTime()) +
        "</time>" +
        "</div>" +
        "<h3 class=\"news-card__title\">" +
        escapeHtml(item.title) +
        "</h3>" +
        '<p class="news-card__summary">' +
        escapeHtml(item.summary) +
        "</p>" +
        '<div class="news-card__source">' +
        "<span>Source</span>" +
        "<span>" +
        escapeHtml(item.source) +
        "</span>" +
        "</div>";

      newsGrid.appendChild(card);
    });
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentFilter = btn.getAttribute("data-filter") || "tous";
      filterBtns.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      renderNews();
    });
  });

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", function () {
      var pulse = veilleStatus && veilleStatus.querySelector(".pulse");
      if (pulse) {
        pulse.style.animation = "none";
        void pulse.offsetWidth;
        pulse.style.animation = "";
      }
      renderNews();
    });
  }

  /* Rotation automatique du flux */
  renderNews();
  window.setInterval(function () {
    renderNews();
  }, 26000);

  /* ---------- Assistant simple ---------- */
  var assistantInput = document.getElementById("assistant-input");
  var assistantSend = document.getElementById("assistant-send");
  var assistantReply = document.getElementById("assistant-reply");
  var chips = document.querySelectorAll(".chip");

  var ANSWERS = {
    qui: {
      keywords: ["qui", "présente", "identité", "bonjour", "salut"],
      text:
        "Je suis Yoas Paul-Christ, développeur full-stack et designer UI/UX, étudiant en BTS SIO SLAM (2024–2026), basé en Île-de-France. Je suis disponible immédiatement pour des missions web, e-commerce et produits digitaux.",
    },
    skills: {
      keywords: ["compétence", "stack", "techno", "outil", "maîtrise"],
      text:
        "Je travaille avec HTML, CSS, JavaScript, PHP, MySQL, le design UI/UX, le SEO, l’e-commerce (dont Stripe), la cybersécurité de base et le support informatique.",
    },
    parcours: {
      keywords: ["parcours", "expérience", "stage", "entreprise", "cv"],
      text:
        "Mon parcours : support et réseau chez AIRTEL (2024), création e-commerce et automatisation chez SAS MALAR (2025), puis maintenance web, SEO et Stripe chez UGOP (2025). Formation : BTS SIO SLAM en cours.",
    },
    projets: {
      keywords: ["projet", "portfolio", "réalisation", "site", "ugop"],
      text:
        "Mes projets : le site UGOP (ugop.fr) — maintenance, SEO et e-commerce Stripe — et Goshen Services, application de gestion de flotte de véhicules de location (github.com/YOASKING/goshenservices).",
    },
  };

  function answerFromText(q) {
    var lower = q.toLowerCase().trim();
    if (!lower) {
      return "Posez une question ou utilisez les raccourcis ci-dessus.";
    }
    if (/qui es-tu|qui êtes-vous|présente|identité|bonjour|salut/.test(lower)) {
      return ANSWERS.qui.text;
    }
    if (/compétence|competence|stack|technologie|outil/.test(lower)) {
      return ANSWERS.skills.text;
    }
    if (/parcours|expérience|experience|stage|cv|formation/.test(lower)) {
      return ANSWERS.parcours.text;
    }
    if (/projet|portfolio|réalisation|realisation|ugop|site/.test(lower)) {
      return ANSWERS.projets.text;
    }
    return (
      "Je n’ai pas de réponse prévue pour cette formulation. Essayez : « Qui es-tu ? », « Tes compétences ? » ou « Ton parcours ? »."
    );
  }

  function showAssistantReply(text) {
    if (!assistantReply) return;
    assistantReply.textContent = text;
    assistantReply.classList.add("is-answer");
  }

  function assistantSubmit() {
    if (!assistantInput || !assistantReply) return;
    var text = answerFromText(assistantInput.value);
    showAssistantReply(text);
  }

  if (assistantSend) {
    assistantSend.addEventListener("click", assistantSubmit);
  }
  if (assistantInput) {
    assistantInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        assistantSubmit();
      }
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var key = chip.getAttribute("data-q");
      if (key === "qui" && assistantInput) assistantInput.value = "Qui es-tu ?";
      if (key === "skills" && assistantInput) assistantInput.value = "Tes compétences ?";
      if (key === "parcours" && assistantInput) assistantInput.value = "Ton parcours ?";
      if (key === "projets" && assistantInput) assistantInput.value = "Tes projets ?";
      assistantSubmit();
    });
  });
})();
