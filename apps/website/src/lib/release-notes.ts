export interface ReleaseNote {
  version: string
  publishedAt: string
  title: string
  summary: string
  kind: 'major' | 'minor' | 'patch'
  githubUrl: string
  compareUrl?: string
  highlights: string[]
  transition?: string
}

export interface ReleaseNoteTranslation {
  title: string
  summary: string
  highlights: string[]
  transition?: string
}

export const releaseNotes: ReleaseNote[] = [
  {
    version: 'v0.4.3',
    publishedAt: '2026-03-24T11:40:26Z',
    title: 'Authentication URL hardening and release alignment',
    summary:
      'A focused patch that hardens authentication and registration URL generation, especially when Ferriskey runs behind a root path or a webapp URL with trailing slashes.',
    kind: 'patch',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.4.3',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.4.2...v0.4.3',
    highlights: [
      'Normalizes login URL construction to avoid double slashes in authentication redirects.',
      'Applies root-path aware base URLs to authenticate, registration, and token exchange handlers.',
      'Bumps workspace and Helm chart versions together so the shipped artifacts stay aligned.',
    ],
    transition:
      'This closes the 0.4 line with a practical production fix: cleaner redirects, safer URL composition, and properly aligned release metadata.',
  },
  {
    version: 'v0.4.2',
    publishedAt: '2026-03-13T16:08:36Z',
    title: 'Dockerfile and Nginx packaging fixes',
    summary:
      'A packaging-focused patch release that fixes the delivery layer around the web application, with corrections in the Docker entrypoint, Dockerfile flow, and Nginx configuration.',
    kind: 'patch',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.4.2',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.4.1...v0.4.2',
    highlights: [
      'Fixes the Dockerfile path so the packaged web application boots with the expected assets.',
      'Corrects the container entrypoint behavior in the release build.',
      'Updates Nginx configuration so the shipped image serves the app correctly.',
    ],
    transition:
      'It is a narrow release, but an important one: it turns the 0.4 branch into something easier to ship and verify in containers.',
  },
  {
    version: 'v0.4.1',
    publishedAt: '2026-03-12T22:43:07Z',
    title: 'Authentication callback flow refinement',
    summary:
      'A patch release centered on the authentication callback path, tightening refresh-token behavior and smoothing the post-login handoff.',
    kind: 'patch',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.4.1',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.4.0...v0.4.1',
    highlights: [
      'Fixes the authentication callback flow after the broader 0.4.0 changes.',
      'Adjusts refresh-token logic so sign-in completion behaves more predictably.',
      'Stabilizes the handoff between the login journey and token lifecycle.',
    ],
    transition:
      'This patch serves as the functional correction right after 0.4.0 before the packaging fixes that landed in 0.4.2.',
  },
  {
    version: 'v0.4.0',
    publishedAt: '2026-03-12T11:30:32Z',
    title: 'Client scopes, Compass observability, and account recovery foundations',
    summary:
      'Version 0.4.0 is a major step forward for platform teams: token shaping improves, authentication flows become observable, and user recovery starts to land as a complete subsystem.',
    kind: 'major',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.4.0',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.3.0...v0.4.0',
    highlights: [
      'Introduces client scopes, mappings, migrations, and API support for better token composition.',
      'Launches Compass runtime, database layer, API endpoints, and UI to inspect authentication flows.',
      'Adds password reset and SMTP management building blocks, including UI and infrastructure.',
    ],
    transition:
      'Once federation was established in 0.3.0, the next logical move was to improve policy control, visibility, and recovery across the sign-in journey.',
  },
  {
    version: 'v0.3.0',
    publishedAt: '2026-02-02T00:23:38Z',
    title: 'Federation becomes real',
    summary:
      'Ferriskey expands beyond local identity management with federation primitives, social login, LDAP support, and SSO endpoints.',
    kind: 'major',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.3.0',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.2.1...v0.3.0',
    highlights: [
      'Adds the Abyss federation module and user federation entities and migrations.',
      'Ships social auth APIs, LDAP provider CRUD, sync and connection test endpoints.',
      'Improves login UX, error detail quality, and permissions hydration in the app.',
    ],
    transition:
      'At this point the project stops being only an internal IAM console and starts addressing real-world enterprise identity integration problems.',
  },
  {
    version: 'v0.2.1',
    publishedAt: '2026-01-16T16:58:38Z',
    title: 'Maintenance patch for the 0.2 line',
    summary:
      'A small release that backports the necessary fixes to keep the 0.2 branch versioned and consumable while larger federation work continues on main.',
    kind: 'patch',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.2.1',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.2.0...v0.2.1',
    highlights: [
      'Cherry-picks targeted fixes from main into the 0.2 release line.',
      'Corrects release versioning before the next milestone.',
      'Keeps existing adopters on a stable branch without forcing a larger upgrade.',
    ],
    transition:
      'It is a short stop on the timeline, but it shows the project already treating release management as part of the product.',
  },
  {
    version: 'v0.2.0',
    publishedAt: '2025-12-30T16:48:43Z',
    title: 'Operations, webhooks, and admin surface expansion',
    summary:
      'Ferriskey broadens its operator story with webhooks, required actions, stronger admin pages, and the first serious steps toward event-driven integrations.',
    kind: 'major',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.2.0',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.1.1...v0.2.0',
    highlights: [
      'Introduces webhook notifications and required actions in the authentication journey.',
      'Expands admin UX with realm settings, login settings, IdP overview, and UI polish across clients and roles.',
      'Lays groundwork for SeaWatch and strengthens deployment support with TLS and Docker improvements.',
    ],
    transition:
      'From here the roadmap opens up: not just authenticating users, but integrating identity events into the rest of the platform.',
  },
  {
    version: 'v0.1.1',
    publishedAt: '2025-08-11T09:44:38Z',
    title: 'First post-launch hardening pass',
    summary:
      'The first patch release focuses on correctness and release hygiene right after the initial public milestone.',
    kind: 'patch',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.1.1',
    compareUrl: 'https://github.com/ferriskey/ferriskey/compare/v0.1.0...v0.1.1',
    highlights: [
      'Fixes session cookie handling to make authentication flows safer.',
      'Corrects Docker Compose execution context issues.',
      'Cleans up the Helm release workflow so tags are published more predictably.',
    ],
    transition:
      'This is where the team starts closing the gap between a fast-moving launch and a project people can trust to upgrade.',
  },
  {
    version: 'v0.1.0',
    publishedAt: '2025-08-07T16:19:02Z',
    title: 'The first public Ferriskey baseline',
    summary:
      'The first stable release establishes the platform core: realms, clients, users, roles, OpenID endpoints, admin UI, packaging, and deployment tooling.',
    kind: 'major',
    githubUrl: 'https://github.com/ferriskey/ferriskey/releases/tag/v0.1.0',
    highlights: [
      'Delivers the foundational IAM surface: realms, clients, roles, permissions, users, and authentication endpoints.',
      'Ships the first admin portal flows, including login, client management, role management, and user management.',
      'Adds Helm, operator, Docker, metrics, and documentation so Ferriskey can be evaluated as a real platform.',
    ],
  },
]

export const latestRelease = releaseNotes[0]

export const releaseNoteTranslations: Record<string, Record<string, ReleaseNoteTranslation>> = {
  fr: {
    'v0.4.3': {
      title: "Durcissement des URLs d'authentification et alignement de release",
      summary:
        "Un patch ciblé qui fiabilise la génération des URLs d'authentification et d'inscription, notamment lorsque Ferriskey tourne derrière un `root_path` ou avec une URL webapp terminée par un slash.",
      highlights: [
        "Normalise la construction des URLs de login pour éviter les doubles slashs dans les redirections d'authentification.",
        "Applique des base URLs tenant compte du `root_path` dans les handlers d'authenticate, registration et token exchange.",
        "Réaligne les versions du workspace et du chart Helm pour garder des artefacts cohérents.",
      ],
      transition:
        "Cette release clôt la ligne 0.4 avec un correctif concret de production: des redirections plus propres, une composition d'URL plus sûre et des métadonnées de release alignées.",
    },
    'v0.4.2': {
      title: 'Correctifs Dockerfile et packaging Nginx',
      summary:
        "Un patch centré sur le packaging qui corrige la couche de livraison de l'application web, avec des ajustements sur l'entrypoint Docker, le flux du Dockerfile et la configuration Nginx.",
      highlights: [
        "Corrige le chemin du Dockerfile pour que l'application packagée démarre avec les bons assets.",
        "Corrige le comportement de l'entrypoint dans le build de release.",
        "Met à jour la configuration Nginx pour que l'image livrée serve correctement l'application.",
      ],
      transition:
        "La portée est volontairement étroite, mais importante: la branche 0.4 devient plus simple à livrer et à vérifier en environnement conteneurisé.",
    },
    'v0.4.1': {
      title: "Ajustements du flow de callback d'authentification",
      summary:
        "Un patch centré sur le callback d'authentification, qui resserre le comportement du refresh token et fluidifie la fin du parcours de connexion.",
      highlights: [
        "Corrige le flow de callback d'authentification après les changements plus larges de la 0.4.0.",
        "Ajuste la logique de refresh token pour rendre la fin de connexion plus prévisible.",
        "Stabilise le passage entre le parcours de login et le cycle de vie du token.",
      ],
      transition:
        "Ce patch sert de correctif fonctionnel juste après la 0.4.0, avant les fixes de packaging livrés en 0.4.2.",
    },
    'v0.4.0': {
      title: 'Client scopes, observabilité Compass et fondations de récupération de compte',
      summary:
        "La version 0.4.0 marque une vraie avancée pour les équipes plateforme: la composition des tokens progresse, les flows d'authentification deviennent observables et la récupération de compte commence à former un sous-système cohérent.",
      highlights: [
        "Introduit les client scopes, mappings, migrations et APIs pour mieux composer les tokens.",
        "Lance le runtime Compass, sa couche base de données, ses endpoints API et son UI pour inspecter les flows d'authentification.",
        "Ajoute les briques de reset password et de gestion SMTP, côté UI comme côté infrastructure.",
      ],
      transition:
        "Une fois la fédération posée en 0.3.0, l'étape logique suivante était d'améliorer le contrôle, la visibilité et la récupération sur tout le parcours de connexion.",
    },
    'v0.3.0': {
      title: 'La fédération devient réelle',
      summary:
        "Ferriskey dépasse la simple gestion d'identité locale avec des primitives de fédération, du social login, du support LDAP et des endpoints SSO.",
      highlights: [
        "Ajoute le module de fédération Abyss ainsi que les entités et migrations de user federation.",
        "Livre les APIs de social auth, le CRUD des providers LDAP, la synchro et les endpoints de test de connexion.",
        "Améliore l'expérience de login, la qualité des erreurs et l'hydratation des permissions dans l'application.",
      ],
      transition:
        "À partir de là, le projet n'est plus seulement une console IAM interne: il commence à traiter de vrais cas d'intégration d'identité en environnement entreprise.",
    },
    'v0.2.1': {
      title: 'Patch de maintenance pour la ligne 0.2',
      summary:
        "Une petite release qui rétroporte les correctifs nécessaires pour garder la branche 0.2 versionnée et utilisable pendant que le travail de fédération continue sur main.",
      highlights: [
        'Cherry-pick de correctifs ciblés depuis main vers la ligne 0.2.',
        'Corrige le versioning avant le jalon suivant.',
        "Permet aux premiers adopteurs de rester sur une branche stable sans forcer une montée de version plus large.",
      ],
      transition:
        "C'est une étape courte dans la timeline, mais elle montre déjà que la gestion des releases fait partie du produit.",
    },
    'v0.2.0': {
      title: 'Ops, webhooks et extension de la surface admin',
      summary:
        "Ferriskey élargit son histoire opérateur avec les webhooks, les required actions, des pages d'administration plus solides et les premiers vrais pas vers des intégrations pilotées par événements.",
      highlights: [
        "Introduit les notifications webhook et les required actions dans le parcours d'authentification.",
        "Étend l'UX admin avec les paramètres de realm, les réglages de login, la vue d'ensemble IdP et de nombreuses finitions sur les clients et rôles.",
        "Pose les bases de SeaWatch et renforce le support de déploiement avec TLS et des améliorations Docker.",
      ],
      transition:
        "À partir de là, la roadmap s'ouvre: il ne s'agit plus seulement d'authentifier, mais aussi d'intégrer les événements d'identité au reste de la plateforme.",
    },
    'v0.1.1': {
      title: 'Premier durcissement post-lancement',
      summary:
        "Le premier patch se concentre sur la correction et l'hygiène de release juste après le premier jalon public.",
      highlights: [
        "Corrige la gestion des cookies de session pour rendre les flows d'authentification plus sûrs.",
        "Corrige des problèmes de contexte d'exécution avec Docker Compose.",
        "Nettoie le workflow de release Helm pour publier les tags de manière plus prévisible.",
      ],
      transition:
        "C'est le moment où l'équipe commence à refermer l'écart entre un lancement rapide et un projet en lequel on peut avoir confiance pour monter de version.",
    },
    'v0.1.0': {
      title: 'La première base publique de Ferriskey',
      summary:
        "La première release stable pose le socle de la plateforme: realms, clients, utilisateurs, rôles, endpoints OpenID, UI d'administration, packaging et outillage de déploiement.",
      highlights: [
        "Livre le socle IAM: realms, clients, rôles, permissions, utilisateurs et endpoints d'authentification.",
        "Livre les premiers flows du portail d'administration, dont login, gestion des clients, des rôles et des utilisateurs.",
        "Ajoute Helm, operator, Docker, métriques et documentation pour permettre d'évaluer Ferriskey comme une vraie plateforme.",
      ],
    },
  },
}
