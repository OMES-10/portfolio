# SEG3525 – Devoir 1 · Portfolio
# FICHIER 09 : Guide de déploiement sur Netlify et GitHub Pages
# ──────────────────────────────────────────────────────────────────
# Ce fichier texte explique étape par étape comment héberger
# votre portfolio. Lisez-le de haut en bas.

##############################################################
# OPTION A : NETLIFY (recommandé – le plus simple)
##############################################################

# ── Prérequis ─────────────────────────────────────────────
# 1. Compte GitHub  : https://github.com/join
# 2. Compte Netlify : https://app.netlify.com/signup

# ── Étapes ────────────────────────────────────────────────

# ÉTAPE 1 – Créer un répertoire GitHub
#   a. Sur GitHub → bouton "New repository"
#   b. Nom : portfolio  (ou le nom de votre choix)
#   c. Visibilité : Public  ← IMPORTANT pour que l'AE puisse y accéder
#   d. Cochez "Add a README file"
#   e. Cliquer "Create repository"

# ÉTAPE 2 – Cloner le répertoire sur votre machine
git clone https://github.com/VOTRE_USERNAME/portfolio.git
cd portfolio

# ÉTAPE 3 – Copier vos fichiers dans ce dossier
#   (copiez index.html, css/, js/, images/, pages/ dans ce dossier)

# ÉTAPE 4 – Pousser votre code sur GitHub
git add .
git commit -m "Devoir 1 : portfolio initial"
git push origin main

# ÉTAPE 5 – Déployer sur Netlify
#   a. Aller sur https://app.netlify.com
#   b. "Add new site" → "Import an existing project"
#   c. Choisir "Deploy with GitHub"
#   d. Autoriser Netlify à accéder à votre GitHub
#   e. Choisir votre repo "portfolio"
#   f. Paramètres de build :
#      - Branch to deploy   : main
#      - Build command      : (laisser vide)
#      - Publish directory  : .    (point = racine du repo)
#   g. Cliquer "Deploy site"
#   h. Attendre ~30 secondes
#   i. Votre URL : https://NOM-ALEATOIRE.netlify.app

# ÉTAPE 6 – Personnaliser votre URL (optionnel)
#   Dans Netlify : Site settings → General → Site name
#   → Changer en : prenom-nom-portfolio.netlify.app

# ÉTAPE 7 – Mettre à jour le site
#   Après chaque modification de code :
git add .
git commit -m "Mise à jour du portfolio"
git push origin main
#   Netlify re-déploie automatiquement en 1–2 minutes !


##############################################################
# OPTION B : GITHUB PAGES (alternative gratuite)
##############################################################

# ── Étapes ────────────────────────────────────────────────

# ÉTAPE 1 – Pousser votre code sur GitHub (même que l'étape 1-4 ci-dessus)

# ÉTAPE 2 – Activer GitHub Pages
#   a. Sur votre repo GitHub → onglet "Settings"
#   b. Menu gauche → "Pages"
#   c. Source : "Deploy from a branch"
#   d. Branch : main  /  (root)
#   e. Cliquer "Save"
#   f. Attendre 2–5 minutes
#   g. Votre URL : https://VOTRE_USERNAME.github.io/portfolio/

# ÉTAPE 3 – Vérifier que index.html est à la racine
#   GitHub Pages cherche index.html à la racine du repo.
#   Votre structure doit être :
#
#   portfolio/
#   ├── index.html          ← OBLIGATOIRE à la racine
#   ├── css/
#   │   └── style.css
#   ├── js/
#   │   └── main.js
#   ├── images/
#   └── pages/
#       ├── projet1.html
#       ├── projet2.html
#       ├── projet3.html
#       └── projet4.html


##############################################################
# OPTION C : VERCEL (aussi très simple)
##############################################################

# ÉTAPE 1 – Créer un compte sur https://vercel.com
#   → Sign up with GitHub

# ÉTAPE 2 – "New Project" → "Import" votre repo GitHub

# ÉTAPE 3 – Framework Preset : Other (pas de framework)
#   → Deploy

# ÉTAPE 4 – URL générée automatiquement :
#   https://portfolio-VOTRE_USERNAME.vercel.app


##############################################################
# CHECKLIST AVANT LA REMISE (24 mai à minuit)
##############################################################

# [ ] index.html accessible à l'URL publique
# [ ] Toutes les pages placeholder (projet1–4) accessibles via les liens
# [ ] Les images se chargent correctement (vérifier sur mobile aussi)
# [ ] Le lien GitHub (code source) est fonctionnel
# [ ] Tester l'URL dans un onglet de navigation privée (sans cache)
# [ ] Inclure l'URL dans votre rapport PDF

# ── Commandes Git utiles ────────────────────────────────────
# Vérifier l'état de vos fichiers
git status

# Voir les derniers commits
git log --oneline -5

# Si vous avez fait une erreur dans le dernier commit (avant push) :
git commit --amend -m "Message corrigé"

# Revenir au dernier commit publié (ATTENTION : perd les changements locaux)
git checkout -- .
