export interface RoadmapItem {
  title: string
  description: string
  status: 'available' | 'planned' | 'exploring'
  link?: string
  milestone?: string
}

export interface RoadmapColumn {
  key: 'now' | 'next' | 'later'
  title: string
  description: string
  items: RoadmapItem[]
}

const issue = (number: number) => `https://github.com/ferriskey/ferriskey/issues/${number}`

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
        link: issue(851),
      },
      {
        title: 'Identity federation',
        description: 'Act as an OIDC and SAML 2.0 identity provider, and federate with OIDC, LDAP, and social identity providers.',
        status: 'available',
        link: issue(1260),
      },
      {
        title: 'Authentication methods',
        description: 'Cover Magic Link, Passkeys, reset password, TOTP, and the password, client credentials, refresh token, and Token Exchange (RFC 8693) grant types.',
        status: 'available',
        link: issue(1050),
      },
      {
        title: 'Sessions and SSO',
        description: 'Keep a login alive across applications with SSO sessions, and list or revoke active sessions through the session management API.',
        status: 'available',
        link: issue(1143),
      },
      {
        title: 'Account security',
        description: 'Lock accounts after repeated failed logins, and let users manage their own password, TOTP, and passkeys.',
        status: 'available',
        link: issue(1479),
      },
      {
        title: 'Mail and token controls',
        description: 'Configure mail templates, token lifetimes, and authentication-related communication flows.',
        status: 'available',
      },
      {
        title: 'Cloud-native deployment',
        description: 'Ship with Helm, Docker, and Kubernetes support, plus a maintenance mode for planned downtime.',
        status: 'available',
        link: issue(927),
      },
      {
        title: 'Audit and debugging modules',
        description: 'Use Compass and SeaWatch to audit authentication flows, debug behavior, and inspect IAM event logs.',
        status: 'available',
      },
      {
        title: 'Events and permissions',
        description: 'Expose durable webhooks with a persistent outbox, retries, and delivery history, and bitwise permissions for fine-grained IAM administration rights.',
        status: 'available',
        link: issue(1332),
      },
      {
        title: 'Localized admin console',
        description: 'Store a locale per realm and per user, and serve the admin console in English, French, and Simplified Chinese.',
        status: 'available',
        link: issue(1351),
      },
    ],
  },
  {
    key: 'next',
    title: 'Next steps',
    description: 'The next product areas being shaped to make Ferriskey more complete and easier to operate.',
    items: [
      {
        title: 'Server-side listings',
        description: 'Paginate, sort, and filter every listing on the server so large realms stay fast in the console and the API.',
        status: 'planned',
        link: issue(1531),
        milestone: 'v0.10',
      },
      {
        title: 'GDPR self-service',
        description: 'Give users /me endpoints, personal data export, account deletion with a grace period, and consent management.',
        status: 'planned',
        link: issue(992),
        milestone: 'v0.10',
      },
      {
        title: 'Account chooser',
        description: 'Let a user pick between signed-in accounts on the login page, honouring prompt=select_account and login_hint.',
        status: 'planned',
        link: issue(671),
        milestone: 'v0.10',
      },
      {
        title: 'Pooled realms',
        description: 'Host many tenants as realms on one instance, with quotas and stronger tenant isolation semantics.',
        status: 'planned',
        link: issue(1610),
      },
      {
        title: 'Device authorization grant',
        description: 'Support RFC 8628 so CLIs, TVs, and devices without a browser can sign in.',
        status: 'planned',
        link: issue(1020),
      },
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
        title: 'Security hardening',
        description: 'Introduce rate limiting and OAuth 2.1 compliance.',
        status: 'planned',
      },
      {
        title: 'Client operations',
        description: 'Deliver client evaluation tooling and a CLI for operators and developers.',
        status: 'planned',
      },
      {
        title: 'Migration strategies',
        description: 'Document and support migration paths from Supabase, Keycloak, Auth0, and other existing identity stacks.',
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
          description: "Agir comme identity provider OIDC et SAML 2.0, et se fédérer avec des identity providers OIDC, LDAP et sociaux.",
        },
        {
          title: "Méthodes d'authentification",
          description: 'Couvrir Magic Link, Passkeys, reset password, TOTP et les grant types password, client credentials, refresh token et Token Exchange (RFC 8693).',
        },
        {
          title: 'Sessions et SSO',
          description: "Garder une connexion active entre applications avec les sessions SSO, et lister ou révoquer les sessions actives via l'API de session management.",
        },
        {
          title: 'Sécurité des comptes',
          description: 'Verrouiller un compte après des échecs de connexion répétés, et laisser les users gérer eux-mêmes leur mot de passe, TOTP et passkeys.',
        },
        {
          title: 'Mails et contrôle des tokens',
          description: "Configurer les templates mail, les lifetimes des tokens et les communications liées à l'authentification.",
        },
        {
          title: 'Déploiement cloud-native',
          description: 'Fournir le support Helm, Docker et Kubernetes, ainsi qu\'un mode maintenance pour les interruptions planifiées.',
        },
        {
          title: "Audit et modules de debug",
          description: "Utiliser Compass et SeaWatch pour auditer les flows d'authentification, debugger les comportements et inspecter les logs d'événements IAM.",
        },
        {
          title: 'Événements et permissions',
          description: "Exposer des webhooks durables avec outbox persistante, retries et historique de livraison, et des permissions bitwise pour la gestion fine des droits d'administration IAM.",
        },
        {
          title: 'Console admin localisée',
          description: 'Stocker une locale par realm et par user, et servir la console admin en anglais, français et chinois simplifié.',
        },
      ],
    },
    next: {
      title: 'Prochaines étapes',
      description: 'Les prochaines zones produit à construire pour rendre Ferriskey plus complet et plus simple à opérer.',
      items: [
        {
          title: 'Listes côté serveur',
          description: "Paginer, trier et filtrer chaque liste côté serveur pour que les gros realms restent rapides dans la console et l'API.",
        },
        {
          title: 'Self-service RGPD',
          description: "Donner aux users des endpoints /me, l'export de leurs données personnelles, la suppression de compte avec délai de grâce et la gestion des consentements.",
        },
        {
          title: 'Sélecteur de compte',
          description: 'Laisser un user choisir entre ses comptes connectés sur la page de login, en respectant prompt=select_account et login_hint.',
        },
        {
          title: 'Pooled realms',
          description: 'Héberger de nombreux tenants comme realms sur une seule instance, avec quotas et une isolation plus explicite des tenants.',
        },
        {
          title: 'Device authorization grant',
          description: 'Supporter la RFC 8628 pour que les CLI, TV et appareils sans navigateur puissent se connecter.',
        },
        {
          title: 'Portal builder et auth flow',
          description: "Construire une expérience portail configurable et une manière plus claire de définir les parcours d'authentification.",
        },
        {
          title: "Service d'autorisation",
          description: "Définir et spécifier le service d'autorisation dédié avant d'en faire une surface produit stable.",
        },
        {
          title: 'Durcissement sécurité',
          description: 'Introduire le rate limiting et la compliance OAuth 2.1.',
        },
        {
          title: 'Opérations client',
          description: 'Livrer un outil Evaluate client et une CLI pour les opérateurs et développeurs.',
        },
        {
          title: 'Stratégies de migration',
          description: 'Documenter et supporter les chemins de migration depuis Supabase, Keycloak, Auth0 et autres stacks identity existantes.',
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
