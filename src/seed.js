// Données initiales, utilisées seulement si le KV DATA est vide.
// Ensuite tout se gère depuis /admin.
//
// Champs d'un projet :
//   n        sous-domaine (identifiant)        url    adresse ouverte (par défaut https://n.abpq.cc)
//   t        titre                              d      phrase courte (cartes)
//   long     texte de l'étude de cas            c      catégorie
//   tags     stack technique                    tint   couleur de fond sans capture
//   hidden   masqué du site                     role   'highlight' | 'showcase' | null
//   caseShots  3 captures de l'étude de cas : { path, mobile, y }

const DEFAULT_CASE = [
  { path: '/', mobile: true, y: 0 },
  { path: '/', mobile: false, y: 800 },
  { path: '/', mobile: false, y: 1600 },
];

const P = (n, t, d, c, tags, tint, extra = {}) => ({
  n, url: `https://${n}.abpq.cc`, t, d, long: '', c, tags, tint,
  hidden: false, role: null, caseShots: DEFAULT_CASE, auto: false, ...extra,
});

export const SEED = {
  version: 1,
  ignore: ['www', 'redirections', 'goto', 'mm', 'admin'],
  projects: [
    P('captain-amk', 'Captain AMK', 'La cotation NGAP d’une ordonnance, expliquée pas à pas.', 'Santé & sport',
      ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Claude API'], '#1E3A8A', {
        role: 'highlight',
        long: 'Pour un kiné libéral, coter une ordonnance en NGAP prend du temps et laisse place à l’erreur. Captain AMK lit le texte, la photo ou le PDF de l’ordonnance, puis propose la cotation (AMK, AMS, AMC) en suivant un arbre de décision fixe tiré de la nomenclature.\n\nChaque étape du raisonnement est affichée, avec la règle appliquée. L’IA sert à lire l’ordonnance, jamais à inventer le résultat.',
        caseShots: [
          { path: '/', mobile: true, y: 0 },
          { path: '/', mobile: false, y: 800 },
          { path: '/sources', mobile: false, y: 0 },
        ],
      }),
    P('sncf-signage', 'SNCF Signage', 'Les afficheurs départs et arrivées des gares, en temps réel, sur de vrais écrans.', 'Outils',
      ['Next.js', 'TypeScript', 'Firmware', 'OTA'], '#0F2F6B', { role: 'showcase' }),
    P('maregram', 'Marégram', 'Les marées et les créneaux de baignade à La Rochelle, en un coup d’œil.', 'Mer & ville',
      ['Vite', 'JavaScript', 'PWA', 'iCal'], '#0E3B5C', { role: 'showcase' }),
    P('vendredi-420', 'Vendredi 420', 'Le tableau de bord du groupe voile du vendredi : marée, vent, présences.', 'Mer & ville',
      ['Vite', 'JavaScript', 'PWA'], '#114B4B'),
    P('weekend-larochelle', 'Weekend La Rochelle', 'L’agenda du week-end à La Rochelle et alentours, mis à jour chaque jeudi.', 'Mer & ville',
      ['JavaScript', 'PWA'], '#5A2A1A'),
    P('memento-mori-17', 'Memento Mori', 'Une chasse au trésor NFC à travers les mosaïques de La Rochelle.', 'Mer & ville',
      ['Next.js', 'React', 'Turso', 'Drizzle', 'MapLibre', 'NFC'], '#2B2B2E', { url: 'https://mm.abpq.cc' }),
    P('simple-cardiac-coherence', 'Cohérence cardiaque', 'Respirer en rythme : trois tempos guidés, rien d’autre.', 'Santé & sport',
      ['JavaScript', 'PWA'], '#1F4E6B'),
    P('ptworkouts', 'PT Workouts', 'Un minuteur d’intervalles et de rounds, à envoyer sur un écran.', 'Santé & sport',
      ['Vite', 'PWA'], '#6B1D1D'),
    P('fairway', 'Fairway', 'Trouver les compétitions de golf près de chez soi.', 'Santé & sport',
      ['React', 'Vite', 'Hono', 'Leaflet', 'TypeScript', 'Better Auth'], '#1D4D2B'),
    P('rugby', 'Rugby', 'Scores, classements et palmarès du Top 14 et de la Champions Cup.', 'Santé & sport',
      ['Vite', 'PWA'], '#3B2A5C'),
    P('kallax', 'Kallax Designer', 'Composer ses meubles KALLAX en 3D, au centimètre près.', 'Outils',
      ['Three.js', 'Vite', 'TypeScript'], '#5C4A12'),
    P('card-me-please', 'Card me please', 'Une carte de mutuelle transformée en carte au format bancaire, prête à imprimer.', 'Outils',
      ['Next.js', 'React', 'Tailwind', 'Claude API', 'React PDF'], '#4A1E4F'),
    P('minitel', 'Vidéotex', 'Un éditeur de pages Minitel, comme en 1985.', 'Outils',
      ['Vite', 'JavaScript'], '#0D4A3A'),
    P('precepteur', 'Précepteur', 'Les leçons des enfants transformées en exercices, avec un suivi pour les parents.', 'Outils',
      ['Vite', 'PWA', 'Claude API', 'Vitest'], '#4F3A1A'),
    P('elaboureur', 'eLaboureur', 'Confitures : une formule par pot, la méthode et le carnet de production.', 'Outils',
      ['Next.js', 'React'], '#6B2A3A'),
    P('phoenix-image-studio-v1', 'Phoenix Studio', 'Un atelier de création d’images qui fait dialoguer Claude et Gemini.', 'Outils',
      ['Vite', 'Claude API', 'Gemini', 'Supabase'], '#3A1A5C'),
  ],
};

export { DEFAULT_CASE };
