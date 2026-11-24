# abpq-home

Page d'accueil qui liste les projets hébergés sur `*.abpq.cc`.

- **En ligne :** https://abpq.cc, via le Worker `abpq-redirections` qui transmet ici tout ce qui n'est pas une redirection (service binding).
- **Stack :** un Worker Cloudflare, sans build. La page est générée par `src/page.js`.
- **Projets :** modifier `src/projects.js` (sous-domaine, titre, description, catégorie).
- **Captures :** JPEG 1280×800 stockées dans le KV `abpq-home-shots` (clé = sous-domaine), servies sur `/shots/<nom>.jpg`. Générées avec l'API Cloudflare Browser Rendering (`POST /accounts/{id}/browser-rendering/screenshot`) puis écrites dans le KV. Sans capture, la carte affiche le titre sur un fond coloré.

## Déployer

```
npx wrangler deploy
```
