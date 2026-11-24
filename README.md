# abpq-home

La page d'accueil de https://abpq.cc et son admin.

## Site
- Servi par le Worker `abpq-home`, via `abpq-redirections` qui transmet ici tout ce qui n'est pas une redirection.
- Ordre de la page : **étude de cas** (le projet highlight : grande capture, texte, stack, 3 captures plus petites), **2 showcases**, puis **la liste filtrable** des autres projets visibles.
- Chaque projet affiche sa stack technique sous forme de tags.

## Admin : https://abpq.cc/admin
- Connexion par code à 6 chiffres envoyé à `ADMIN_EMAIL` (binding `send_email`, expéditeur `admin@abpq.cc`). Code valable 10 min, 5 essais, session de 30 jours.
- Pour chaque projet : visible ou masqué, highlight (1 max) ou showcase (2 max), ordre, titre, adresse, phrase courte, texte d'étude de cas, catégorie, tags, captures.
- Ajout manuel d'un projet, retrait de la liste (le sous-domaine passe alors dans la liste des ignorés).

## Mise à jour automatique
- Toutes les heures (cron), et avec le bouton « Scanner » : lecture des enregistrements DNS de abpq.cc. Chaque nouveau sous-domaine qui répond est ajouté, avec titre et description lus dans sa page, stack détectée depuis le HTML et capture d'écran.
- Nécessite le secret `CF_API_TOKEN` (permissions : Zone DNS Read sur abpq.cc, Account Browser Rendering Edit). Sans lui, l'admin fonctionne mais le scan et les captures automatiques sont désactivés.

## Données
- KV `DATA` (`abpq-home-data`) : clé `site` = `{ projects, ignore, lastScan, updatedAt }`, clé `otp` (code en cours). Rempli depuis `src/seed.js` au premier lancement.
- KV `SHOTS` (`abpq-home-shots`) : `<n>` (capture principale), `case:<n>:1..3` (étude de cas).

## Déployer
Push sur `main` (Workers Builds) ou `npx wrangler deploy`.
