# 日本 2026 — Compagnon de voyage (PWA)

## Structure des fichiers

```
japon-2026-app/
├── index.html              # markup + tout le CSS (thème papier/indigo/shu)
├── manifest.json           # métadonnées PWA (icônes, couleurs, mode standalone)
├── service-worker.js       # cache app-shell minimal → fonctionne hors-ligne
├── js/
│   ├── data.js              # données du voyage (villes, hôtels, vols, phrases, activités)
│   ├── storage.js           # localStorage (checklist, dépenses, activités ajoutées, export/import)
│   └── app.js                # rendu + navigation + interactions
└── icons/
    ├── icon-180.png          # apple-touch-icon
    ├── icon-192.png
    ├── icon-512.png
    └── icon-512-maskable.png
```

Aucune dépendance externe, aucun build. Modifier `js/data.js` pour changer le contenu du voyage (réservations, programme, phrases, activités) sans toucher à la logique.

## Ce qui reste à compléter

- **Phrases japonaises** (`js/data.js`, tableau `PHRASES`) : seulement 4 exemples de structure pour l'instant. Le contenu définitif (cacherout, Chabbat, politesse) est à ajouter — même format `{id, category, jp, romaji, fr}`.
- **Adresses japonaises** (`js/data.js`, tableau `HOTELS`, champ `addressJP`) : manquantes pour Heian No Mori Kyoto, Guest Living Mu Shirahama, et APA Hotel Shinagawa Tokyo. Dès que tu les as, remplis le champ (même format que les 3 déjà renseignées : `"060-0001 札幌市中央区北1条西3丁目3-10"`).
- **Taux de change** (`js/data.js`, en haut) : `JPY_PER_USD` et `KRW_PER_USD` sont des constantes fixes, à ajuster à la main si besoin.

## Déployer sur GitHub Pages

1. Crée un nouveau repo GitHub (public ou privé — Pages fonctionne avec les deux sur un compte payant ; sur un compte gratuit, le repo doit être public pour Pages).
2. Depuis ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Compagnon de voyage Japon 2026"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/<nom-du-repo>.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages** → Source : `Deploy from a branch` → Branch : `main` / `(root)` → Save.
4. Après une minute ou deux, l'app est en ligne à `https://<ton-compte>.github.io/<nom-du-repo>/`.
5. **Important** : le PWA doit être servi en HTTPS (GitHub Pages le fait automatiquement) — un simple fichier ouvert en local (`file://`) ne permet pas d'installer le service worker.

Pour toute mise à jour ultérieure : modifie les fichiers, puis `git add . && git commit -m "..." && git push`. Pense à changer `CACHE_NAME` dans `service-worker.js` (ex. `v2`, `v3`…) à chaque déploiement pour que les téléphones qui ont déjà installé l'app récupèrent la nouvelle version au lieu de rester sur l'ancienne mise en cache.

## Installer sur iPhone

1. Ouvre l'URL GitHub Pages dans **Safari** (pas Chrome — l'installation PWA sur iOS ne fonctionne que depuis Safari).
2. Appuie sur l'icône **Partager** (le carré avec la flèche vers le haut).
3. Fais défiler et choisis **Sur l'écran d'accueil**.
4. Confirme le nom (「日本 2026」) et appuie sur **Ajouter**.
5. L'icône 旅 apparaît sur l'écran d'accueil. En l'ouvrant, l'app se lance en plein écran (mode standalone, sans barre Safari), et fonctionne hors-ligne dès la première ouverture en ligne.

## Tester en local avant de déployer

```bash
cd japon-2026-app
python3 -m http.server 8000
```
Puis ouvre `http://localhost:8000` dans un navigateur (redimensionne la fenêtre à ~390px de large pour simuler un iPhone, ou utilise les outils développeur en mode responsive). Le service worker et le manifest fonctionnent aussi sur `localhost` (exception faite pour HTTPS), donc ce test local est fiable avant de déployer.
