export const defaultLang = 'en' as const

export const ui = {
  en: {
    // Footer
    'footer.text': '© 2025 Ferriskey — Apache 2.0',

    // Nav
    'nav.features': 'Features',
    'nav.releaseNotes': 'Release Notes',
    'nav.roadmap': 'Roadmap',
    'nav.getStarted': 'Get Started',

    // Hero
    'hero.title': 'A Modern IAM Built\nfor Distributed Systems',
    'hero.description': 'FerrisKey is an open-source, cloud-native Identity & Access Management platform designed for Kubernetes, multi-tenancy, and modern security architectures.',
    'hero.primaryAction': 'Getting Started',
    'hero.secondaryAction': 'View on GitHub',
    'hero.badge.oss': 'Open source',
    'hero.badge.license': 'Apache 2.0',
    'hero.badge.version': 'Early Access · v0.4.3',

    // Features
    'features.label': 'Why FerrisKey',
    'features.title': 'Identity infrastructure for cloud-native platforms, without legacy IAM complexity.',
    'features.desc1': 'Identity & Access Management is the backbone of any secure platform. It controls who can authenticate, what they are authorized to do, and how every access event is tracked across every service, team, and environment in your infrastructure.',
    'features.desc2': 'Without a solid IAM foundation, teams end up with fragmented auth logic scattered across services, no unified audit trail, and security gaps that grow with every new product. FerrisKey addresses this with a unified, operator-first approach designed for distributed systems from day one.',
    'features.card.perf.title': 'Rust-native performance',
    'features.card.perf.desc': 'Built in Rust from the ground up — not ported or wrapped. A ~10MB binary, sub-10ms auth latency, and a predictable memory footprint that holds under sustained load.',
    'features.card.deploy.title': 'Deploy & manage your way',
    'features.card.deploy.desc': 'FerrisKey ships with first-class tooling for every ops workflow — from local testing to production GitOps pipelines. No custom scripting required.',
    'features.card.events.title': 'Event-driven extensibility',
    'features.card.events.desc': 'Every identity event — login, token issuance, policy change, realm update — emits a structured event you can consume to trigger webhooks, sync to your data lake, or drive custom workflows without patching the core.',
    'features.card.cncf.title': 'CNCF ecosystem integration',
    'features.card.cncf.desc': 'FerrisKey is designed to fit naturally into cloud-native stacks. Native integrations with the tools your platform team already runs — no adapters, no workarounds.',

    // UI Showcase
    'ui.label': 'Interface',
    'ui.title': 'Built for clarity, designed for speed',
    'ui.description': 'A clean admin UI to manage your realms, clients, users and permissions — without getting lost.',

    // Modules
    'modules.label': 'Modules',
    'modules.title': 'Everything you need to build',
    'modules.description': 'Purpose-built systems for authentication, audit, federation, and more. Each module owns a specific aspect of identity — composable, extensible, and production-ready.',
    'modules.left.title': 'Built for every identity scenario',
    'modules.left.desc': 'From passwordless auth to enterprise federation — the primitives are there, composable by design.',
    'modules.right.title': 'Official modules, zero hunting',
    'modules.right.desc': 'MFA, federation, audit, webhooks — every critical identity concern solved with a dedicated module. No glue code, no compatibility roulette.',
    'modules.cta': 'View all modules',

    // OSS
    'oss.releases': 'Releases',
    'oss.changelog': 'GitHub Changelog',
    'oss.releaseNotes': 'Release Notes',
    'oss.card.title': 'Built in the open.\nSecured by design.',
    'oss.card.desc': 'No lock-in, no black boxes. Audit the code, contribute, or fork it — Ferriskey belongs to the community.',
    'oss.stats': 'OSS Stats',

    // Release notes
    'releaseNotes.label': 'Release notes',
    'releaseNotes.title': 'How Ferriskey has been taking shape, release after release.',
    'releaseNotes.description': 'A curated timeline of stable Ferriskey releases, condensed from the public GitHub history into product-level notes.',
    'releaseNotes.latest': 'Latest stable',
    'releaseNotes.stableCount': 'Stable releases',
    'releaseNotes.timelineStart': 'Timeline start',
    'releaseNotes.timeline': 'Stable release timeline',
    'releaseNotes.timelineHelp': 'Each section starts from a milestone release. The newer fixes released for that same line are grouped with it.',
    'releaseNotes.overview': 'From the first public baseline to federation, observability, and recovery flows.',
    'releaseNotes.back': 'Back to homepage',
    'releaseNotes.github': 'GitHub release',
    'releaseNotes.compare': 'Compare changes',
    'releaseNotes.patch': 'Patch release',
    'releaseNotes.minor': 'Feature release',
    'releaseNotes.major': 'Milestone release',
    'releaseNotes.latestInLine': 'Latest usable in line',
    'releaseNotes.lineSuffix': 'line',
    'releaseNotes.basedOn': 'Based on the public release history of ferriskey/ferriskey on GitHub.',

    // Roadmap
    'roadmap.label': 'Roadmap',
    'roadmap.title': 'Where Ferriskey is going next.',
    'roadmap.description': 'A directional view of what Ferriskey already supports, what comes next, and which longer-term bets matter most.',
    'roadmap.scrollHint': 'On desktop, scrolling down moves the roadmap from current capabilities to next steps and longer-term bets.',
    'roadmap.timelineLabel': 'Timeline',
    'roadmap.cta.releaseNotes': 'See release notes',
    'roadmap.cta.home': 'Back to homepage',
    'roadmap.principles.title': 'Principles',
    'roadmap.principles.one': 'Current capabilities describe what exists today; next and later items remain directional.',
    'roadmap.principles.two': 'The focus is on product capabilities that improve security, operability, and developer experience.',
    'roadmap.principles.three': 'Release Notes explain what shipped version by version. This page explains the broader product direction.',
    'roadmap.status.available': 'Available',
    'roadmap.status.planned': 'Planned',
    'roadmap.status.exploring': 'Exploring',

    // Team
    'team.label': 'Team',
    'team.title': 'Meet the core team',
    'team.description': 'The people behind Ferriskey — building secure identity infrastructure in the open.',

    // Sponsors
    'sponsors.title': 'Proudly supported by our partners',
    'sponsors.description': 'These companies and projects keep Ferriskey thriving. Their support funds development, maintenance, and community growth — allowing us to stay independent and focused on building the best IAM we can.',
    'sponsors.cta': 'Become a partner',
    'sponsors.supporters': 'Supporters',
    'sponsors.placeholder': 'Your Logo',

    // CTA
    'cta.title': 'Your identity layer, your rules.',
    'cta.description': 'Self-hosted, Apache 2.0, built in Rust. Deploy Ferriskey in minutes and own your authentication stack — no vendor, no lock-in.',
    'cta.primary': 'Get started',
    'cta.github': 'View on GitHub',
  },
  fr: {
    // Footer
    'footer.text': '© 2025 Ferriskey — Apache 2.0',

    // Nav
    'nav.features': 'Fonctionnalités',
    'nav.releaseNotes': 'Release notes',
    'nav.roadmap': 'Roadmap',
    'nav.getStarted': 'Démarrer',

    // Hero
    'hero.title': 'Un IAM Moderne Conçu\npour les Systèmes Distribués',
    'hero.description': "FerrisKey est une plateforme open-source de gestion des identités et des accès (IAM), cloud-native, conçue pour Kubernetes, la multi-location et les architectures de sécurité modernes.",
    'hero.primaryAction': 'Démarrer',
    'hero.secondaryAction': 'Voir sur GitHub',
    'hero.badge.oss': 'Open source',
    'hero.badge.license': 'Apache 2.0',
    'hero.badge.version': 'Accès anticipé · v0.4.3',

    // Features
    'features.label': 'Pourquoi FerrisKey',
    'features.title': "Infrastructure d'identité pour les plateformes cloud-native, sans la complexité des IAM legacy.",
    'features.desc1': "La gestion des identités et des accès est le socle de toute plateforme sécurisée. Elle contrôle qui peut s'authentifier, ce qu'ils sont autorisés à faire, et comment chaque événement d'accès est tracé dans chaque service, équipe et environnement de votre infrastructure.",
    'features.desc2': "Sans une base IAM solide, les équipes se retrouvent avec une logique d'authentification fragmentée dispersée dans les services, sans piste d'audit unifiée et avec des failles de sécurité qui grandissent à chaque nouveau produit. FerrisKey répond à cela avec une approche unifiée et orientée opérateur, conçue pour les systèmes distribués dès le premier jour.",
    'features.card.perf.title': 'Performance native en Rust',
    'features.card.perf.desc': "Construit en Rust de bout en bout — pas un portage ni un wrapper. Un binaire de ~10 Mo, une latence d'authentification inférieure à 10 ms et une empreinte mémoire prévisible qui tient sous charge soutenue.",
    'features.card.deploy.title': 'Déployez et gérez à votre façon',
    'features.card.deploy.desc': 'FerrisKey embarque des outils de première classe pour chaque workflow ops — du test local aux pipelines GitOps en production. Aucun script personnalisé requis.',
    'features.card.events.title': 'Extensibilité pilotée par les événements',
    'features.card.events.desc': "Chaque événement d'identité — connexion, émission de token, changement de politique, mise à jour de realm — émet un événement structuré que vous pouvez consommer pour déclencher des webhooks, synchroniser votre data lake ou piloter des workflows personnalisés sans toucher au cœur.",
    'features.card.cncf.title': 'Intégration écosystème CNCF',
    'features.card.cncf.desc': "FerrisKey est conçu pour s'intégrer naturellement dans les stacks cloud-native. Intégrations natives avec les outils que votre équipe plateforme utilise déjà — sans adaptateurs, sans contournements.",

    // UI Showcase
    'ui.label': 'Interface',
    'ui.title': 'Pensée pour la clarté, optimisée pour la rapidité',
    'ui.description': "Une interface d'administration épurée pour gérer vos realms, clients, utilisateurs et permissions — sans se perdre.",

    // Modules
    'modules.label': 'Modules',
    'modules.title': 'Tout ce dont vous avez besoin pour construire',
    'modules.description': "Des systèmes dédiés pour l'authentification, l'audit, la fédération et bien plus encore. Chaque module gère un aspect spécifique de l'identité — composable, extensible et prêt pour la production.",
    'modules.left.title': 'Conçu pour tous les scénarios d\'identité',
    'modules.left.desc': "De l'authentification sans mot de passe à la fédération d'entreprise — les primitives sont là, composables par conception.",
    'modules.right.title': 'Modules officiels, zéro recherche',
    'modules.right.desc': "MFA, fédération, audit, webhooks — chaque problème critique d'identité résolu par un module dédié. Pas de code de colle, pas de roulette de compatibilité.",
    'modules.cta': 'Voir tous les modules',

    // OSS
    'oss.releases': 'Versions',
    'oss.changelog': 'Changelog GitHub',
    'oss.releaseNotes': 'Release notes',
    'oss.card.title': 'Construit en public.\nSécurisé par conception.',
    'oss.card.desc': "Pas de verrouillage, pas de boîtes noires. Auditez le code, contribuez ou forkez-le — Ferriskey appartient à la communauté.",
    'oss.stats': 'Stats OSS',

    // Release notes
    'releaseNotes.label': 'Release notes',
    'releaseNotes.title': 'Comment Ferriskey a pris forme, release après release.',
    'releaseNotes.description': "Une timeline éditorialisée des releases stables de Ferriskey, condensée à partir de l'historique public GitHub.",
    'releaseNotes.latest': 'Dernière stable',
    'releaseNotes.stableCount': 'Releases stables',
    'releaseNotes.timelineStart': 'Début de la timeline',
    'releaseNotes.timeline': 'Timeline des releases stables',
    'releaseNotes.timelineHelp': 'Chaque section part d’une release jalon. Les correctifs plus récents publiés sur cette même ligne sont regroupés avec elle.',
    'releaseNotes.overview': 'De la première base publique à la fédération, l’observabilité et la récupération de compte.',
    'releaseNotes.back': "Retour à l'accueil",
    'releaseNotes.github': 'Release GitHub',
    'releaseNotes.compare': 'Comparer les changements',
    'releaseNotes.patch': 'Release corrective',
    'releaseNotes.minor': 'Release fonctionnelle',
    'releaseNotes.major': 'Release jalon',
    'releaseNotes.latestInLine': 'Dernière utilisable de la ligne',
    'releaseNotes.lineSuffix': 'ligne',
    'releaseNotes.basedOn': "Basé sur l'historique public des releases de ferriskey/ferriskey sur GitHub.",

    // Roadmap
    'roadmap.label': 'Roadmap',
    'roadmap.title': 'Où Ferriskey va ensuite.',
    'roadmap.description': 'Une vue directionnelle de ce que Ferriskey supporte déjà, de ce qui vient ensuite, et des paris plus long terme qui comptent le plus.',
    'roadmap.scrollHint': 'Sur desktop, le scroll vertical fait avancer la roadmap des capacités actuelles vers les prochaines étapes puis le long terme.',
    'roadmap.timelineLabel': 'Timeline',
    'roadmap.cta.releaseNotes': 'Voir les release notes',
    'roadmap.cta.home': "Retour à l'accueil",
    'roadmap.principles.title': 'Principes',
    'roadmap.principles.one': "Les capacités actuelles décrivent ce qui existe déjà; les items next et later restent directionnels.",
    'roadmap.principles.two': "L'accent est mis sur les capacités produit qui améliorent la sécurité, l'opérabilité et l'expérience développeur.",
    'roadmap.principles.three': 'Les Release Notes expliquent ce qui a été livré version par version. Cette page explique la direction produit plus large.',
    'roadmap.status.available': 'Disponible',
    'roadmap.status.planned': 'Prévu',
    'roadmap.status.exploring': 'Exploration',

    // Team
    'team.label': 'Équipe',
    'team.title': "Rencontrez l'équipe principale",
    'team.description': "Les personnes derrière Ferriskey — construisant une infrastructure d'identité sécurisée en open source.",

    // Sponsors
    'sponsors.title': 'Fièrement soutenu par nos partenaires',
    'sponsors.description': "Ces entreprises et projets font prospérer Ferriskey. Leur soutien finance le développement, la maintenance et la croissance de la communauté — nous permettant de rester indépendants et concentrés sur la création du meilleur IAM possible.",
    'sponsors.cta': 'Devenir partenaire',
    'sponsors.supporters': 'Soutiens',
    'sponsors.placeholder': 'Votre Logo',

    // CTA
    'cta.title': 'Votre couche d\'identité, vos règles.',
    'cta.description': "Auto-hébergé, Apache 2.0, construit en Rust. Déployez Ferriskey en quelques minutes et maîtrisez votre stack d'authentification — sans vendor, sans lock-in.",
    'cta.primary': 'Démarrer',
    'cta.github': 'Voir sur GitHub',
  },
} as const

export type UiKey = keyof (typeof ui)['en']
