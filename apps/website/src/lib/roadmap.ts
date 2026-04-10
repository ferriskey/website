export interface RoadmapItem {
  title: string
  description: string
  status: 'available' | 'planned' | 'exploring'
}

export interface RoadmapColumn {
  key: 'now' | 'next' | 'later'
  title: string
  description: string
  items: RoadmapItem[]
}

export const roadmapColumns: RoadmapColumn[] = [
  {
    key: 'now',
    title: 'Current capabilities',
    description: 'What Ferriskey already provides today across IAM, deployment, security, and operations.',
    items: [
      {
        title: 'Realms and IAM objects',
        description: 'Manage realms, clients, users, roles, organizations, client scopes, and protocol mappers from the IAM surface.',
        status: 'available',
      },
      {
        title: 'Identity federation',
        description: 'Support OIDC, LDAP, and external identity providers for federated authentication scenarios.',
        status: 'available',
      },
      {
        title: 'Authentication methods',
        description: 'Cover Magic Link, Passkeys, reset password, TOTP, and core grant types including password, client credentials, and refresh token.',
        status: 'available',
      },
      {
        title: 'Mail and token controls',
        description: 'Configure mail templates, token lifetimes, and authentication-related communication flows.',
        status: 'available',
      },
      {
        title: 'Cloud-native deployment',
        description: 'Ship with Helm, Docker, and Kubernetes support for platform-oriented deployments.',
        status: 'available',
      },
      {
        title: 'Audit and debugging modules',
        description: 'Use Compass and SeaWatch to audit authentication flows, debug behavior, and inspect IAM event logs.',
        status: 'available',
      },
      {
        title: 'Events and permissions',
        description: 'Expose webhooks and bitwise permissions for event-driven integrations and fine-grained IAM administration rights.',
        status: 'available',
      },
    ],
  },
  {
    key: 'next',
    title: 'Next steps',
    description: 'The next product areas being shaped to make Ferriskey more complete and easier to operate.',
    items: [
      {
        title: 'Portal builder and auth flow',
        description: 'Build a configurable portal experience and a clearer way to define authentication journeys.',
        status: 'planned',
      },
      {
        title: 'Authorization service',
        description: 'Define and specify the dedicated authorization service before turning it into a stable product surface.',
        status: 'planned',
      },
      {
        title: 'Organizations and sessions',
        description: 'Add organization groups and a session management API for better administration of tenants, users, and active access.',
        status: 'planned',
      },
      {
        title: 'Security hardening',
        description: 'Introduce brute-force protection, rate limiting, OAuth 2.1 compliance, and Token Exchange support based on RFC 8693.',
        status: 'planned',
      },
      {
        title: 'Account and client operations',
        description: 'Deliver user self-service accounts, client evaluation tooling, and a CLI for operators and developers.',
        status: 'planned',
      },
      {
        title: 'Migration strategies',
        description: 'Document and support migration paths from Supabase, Keycloak, Auth0, and other existing identity stacks.',
        status: 'planned',
      },
      {
        title: 'Native multi-tenancy',
        description: 'Move toward first-class multi-tenancy with quotas and stronger tenant isolation semantics.',
        status: 'planned',
      },
      {
        title: 'Passwordless-first security',
        description: 'Explore device trust and device binding as first-class building blocks for passwordless authentication.',
        status: 'planned',
      },
    ],
  },
  {
    key: 'later',
    title: 'Long term',
    description: 'Longer-horizon bets for policy, authorization, secrets, identity standards, and adaptive security.',
    items: [
      {
        title: 'Policy-driven auth flows',
        description: 'Use OPA to attach policy rules directly to authentication flow decisions.',
        status: 'exploring',
      },
      {
        title: 'Vault-backed secrets',
        description: 'Store critical material such as keys and client secrets in a Vault-backed architecture.',
        status: 'exploring',
      },
      {
        title: 'Authorization standards',
        description: 'Evaluate AuthZEN compliance and fine-grained authorization as the authorization surface matures.',
        status: 'exploring',
      },
      {
        title: 'MCP Server',
        description: 'Expose Ferriskey capabilities through an MCP server for agentic and automation-oriented workflows.',
        status: 'exploring',
      },
      {
        title: 'Decentralized identity',
        description: 'Explore DID and Verifiable Credentials for decentralized identity use cases.',
        status: 'exploring',
      },
      {
        title: 'Adaptive authentication',
        description: 'Use risk scoring to adapt authentication requirements to context and suspicious behavior.',
        status: 'exploring',
      },
    ],
  },
]

export const roadmapTranslations = {
  fr: {
    now: {
      title: 'Capacités actuelles',
      description: "Ce que Ferriskey fournit déjà aujourd'hui sur l'IAM, le déploiement, la sécurité et les opérations.",
      items: [
        {
          title: 'Realms et objets IAM',
          description: "Gérer les realms, clients, users, roles, organisations, client scopes et protocol mappers depuis la surface IAM.",
        },
        {
          title: "Fédération d'identité",
          description: "Prendre en charge OIDC, LDAP et les identity providers externes pour les scénarios d'authentification fédérée.",
        },
        {
          title: "Méthodes d'authentification",
          description: 'Couvrir Magic Link, Passkeys, reset password, TOTP et les grant types password, client credentials et refresh token.',
        },
        {
          title: 'Mails et contrôle des tokens',
          description: "Configurer les templates mail, les lifetimes des tokens et les communications liées à l'authentification.",
        },
        {
          title: 'Déploiement cloud-native',
          description: 'Fournir le support Helm, Docker et Kubernetes pour les déploiements orientés plateforme.',
        },
        {
          title: "Audit et modules de debug",
          description: "Utiliser Compass et SeaWatch pour auditer les flows d'authentification, debugger les comportements et inspecter les logs d'événements IAM.",
        },
        {
          title: 'Événements et permissions',
          description: "Exposer des webhooks et des permissions bitwise pour les intégrations événementielles et la gestion fine des droits d'administration IAM.",
        },
      ],
    },
    next: {
      title: 'Prochaines étapes',
      description: 'Les prochaines zones produit à construire pour rendre Ferriskey plus complet et plus simple à opérer.',
      items: [
        {
          title: 'Portal builder et auth flow',
          description: "Construire une expérience portail configurable et une manière plus claire de définir les parcours d'authentification.",
        },
        {
          title: "Service d'autorisation",
          description: "Définir et spécifier le service d'autorisation dédié avant d'en faire une surface produit stable.",
        },
        {
          title: 'Organisations et sessions',
          description: "Ajouter les organization groups et une API de session management pour mieux administrer les tenants, users et accès actifs.",
        },
        {
          title: 'Durcissement sécurité',
          description: 'Introduire la brute-force protection, le rate limiting, la compliance OAuth 2.1 et Token Exchange selon la RFC 8693.',
        },
        {
          title: 'Opérations compte et client',
          description: 'Livrer un portail self-service user, un outil Evaluate client et une CLI pour les opérateurs et développeurs.',
        },
        {
          title: 'Stratégies de migration',
          description: 'Documenter et supporter les chemins de migration depuis Supabase, Keycloak, Auth0 et autres stacks identity existantes.',
        },
        {
          title: 'Multi-tenancy natif',
          description: 'Aller vers un multi-tenancy de premier niveau avec quotas et une isolation plus explicite des tenants.',
        },
        {
          title: 'Sécurité passwordless-first',
          description: "Explorer Device Trust et Device Binding comme briques centrales de l'authentification passwordless.",
        },
      ],
    },
    later: {
      title: 'Long terme',
      description: "Les paris plus long terme autour des policies, de l'autorisation, des secrets, des standards identity et de la sécurité adaptative.",
      items: [
        {
          title: 'Auth flows pilotés par policies',
          description: "Utiliser OPA pour attacher des règles de policy directement aux décisions du flow d'authentification.",
        },
        {
          title: 'Secrets via Vault',
          description: 'Stocker les informations critiques comme les keys et client secrets dans une architecture appuyée sur Vault.',
        },
        {
          title: "Standards d'autorisation",
          description: "Évaluer la compliance AuthZEN et le fine-grained authorization à mesure que la surface d'autorisation mûrit.",
        },
        {
          title: 'MCP Server',
          description: "Exposer les capacités de Ferriskey via un MCP server pour les usages agents et automatisation.",
        },
        {
          title: 'Identité décentralisée',
          description: "Explorer DID et Verifiable Credentials pour les cas d'usage identity décentralisés.",
        },
        {
          title: 'Authentification adaptative',
          description: "Utiliser un scoring de risque pour adapter les exigences d'authentification au contexte et aux comportements suspects.",
        },
      ],
    },
  },
} as const
