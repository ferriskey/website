export type ModuleFeature = { title: string; desc: string }
export type ModuleStep = { title: string; desc: string }

export interface FerrisModule {
  slug: string
  name: string
  tagline: string
  description: string
  /** Chemin dans l'application docs, sans son adresse : on le préfixe de PUBLIC_DOCS_URL. */
  docsPath: string
  features: ModuleFeature[]
  steps: ModuleStep[]
  pills: string[]
}

export const modules: FerrisModule[] = [
  {
    slug: 'trident',
    name: 'Trident',
    tagline: 'Multi-Factor Authentication',
    description: 'Adds second-factor verification to the authentication chain. Supports TOTP, FIDO2 passkeys, magic links, and recovery codes, configurable per realm.',
    docsPath: '/en/modules/trident/overview',
    pills: ['TOTP', 'WebAuthn', 'Passkeys', 'Magic Links', 'Recovery Codes', 'YubiKey', 'Face ID', 'Touch ID', 'RFC 6238', 'FIDO2'],
    features: [
      { title: 'TOTP',          desc: 'Time-based one-time passwords compatible with Google Authenticator, Authy, 1Password, and any RFC 6238 app.' },
      { title: 'WebAuthn',      desc: 'FIDO2 passkeys: hardware keys (YubiKey), Touch ID, Face ID, Windows Hello, and synced passkeys.' },
      { title: 'Magic Links',   desc: 'Passwordless email login. A unique short-lived link lands in the inbox, and clicking it signs the user in.' },
      { title: 'Recovery Codes', desc: 'One-time backup codes for account recovery when the primary MFA device is unavailable.' },
      { title: 'Required Actions', desc: 'Enforce MFA enrollment on every new user, so it is mandatory rather than optional.' },
      { title: 'Temporary Tokens', desc: 'Short-lived tokens issued during the MFA challenge. They cannot reach a protected resource.' },
    ],
    steps: [
      { title: 'Credentials validated',   desc: 'User submits their username and password. FerrisKey validates and checks for configured MFA credentials.' },
      { title: 'MFA challenge issued',    desc: 'If MFA is configured, a temporary token and challenge are returned. The client prompts for the second factor.' },
      { title: 'Second factor verified',  desc: 'The user submits the OTP, passkey assertion, or clicks the magic link. Trident validates the response.' },
      { title: 'Full tokens issued',      desc: 'On success, FerrisKey issues access, refresh, and ID tokens. The session is fully established.' },
    ],
  },
  {
    slug: 'seawatch',
    name: 'SeaWatch',
    tagline: 'Audit & Security Events',
    description: 'Records every security-relevant action: logins, password resets, role assignments, config changes, each with the context compliance and incident work needs.',
    docsPath: '/en/modules/seawatch/overview',
    pills: ['Audit Logs', 'SIEM Export', 'SOC 2', 'ISO 27001', 'GDPR', 'IP Tracking', 'Trace IDs', 'OpenTelemetry', 'Incident Response', 'Anomaly Detection'],
    features: [
      { title: 'Structured Events',    desc: 'Every event captures actor, target, IP address, user agent, trace ID, and event-specific details in a consistent JSON schema.' },
      { title: 'UUIDv7 Identifiers',  desc: 'Time-ordered IDs make events naturally sortable and allow efficient range queries without full-table scans.' },
      { title: 'Actor Classification', desc: 'Events distinguish between user, service account, admin, and system actions for clear accountability.' },
      { title: 'OTel Integration',     desc: 'Trace IDs link SeaWatch events to spans in Jaeger, Datadog, or any OpenTelemetry-compatible system.' },
      { title: 'SIEM Ready',          desc: 'Forward events to Splunk, Elastic, or Datadog. The structured format maps directly to common SIEM schemas.' },
      { title: 'Compliance Evidence', desc: 'Generate SOC 2, ISO 27001, and GDPR audit evidence by querying on time range, actor, or event type.' },
    ],
    steps: [
      { title: 'Action occurs',           desc: 'A user logs in, an admin changes a realm setting, or a service account requests a token.' },
      { title: 'Event constructed',       desc: 'SeaWatch builds a structured event capturing who, what, when, where, and why with full context.' },
      { title: 'Persisted asynchronously', desc: 'Events are written to storage off the main request path, so authentication takes no latency hit.' },
      { title: 'Query & export',          desc: 'Query events through the admin API by type, actor, or time range. Forward to your SIEM via webhooks.' },
    ],
  },
  {
    slug: 'compass',
    name: 'Compass',
    tagline: 'Authentication Flow Engine',
    description: 'Records every authentication attempt as a structured flow: named steps with their own outcomes, timings, and error details. You see how users actually authenticate.',
    docsPath: '/en/modules/compass/overview',
    pills: ['Flow Tracing', 'Step Timings', 'Error Codes', 'Auth Debugging', 'Observability', 'Pending / Success / Failure', 'Duration ms', 'Grant Types', 'PKCE', 'Authorization Code'],
    features: [
      { title: 'Flow Recording',    desc: 'Each authentication request opens a CompassFlow, a complete record from the first request to the token or the failure.' },
      { title: 'Step-Level Detail', desc: 'Nine step types tracked individually: authorize, credential validation, MFA, token exchange, IdP redirect and callback, the two SAML steps, and finalize.' },
      { title: 'Per-Step Timings',  desc: 'Every step records its duration in milliseconds. Spot slow Argon2 rounds, external IdP latency, or database bottlenecks.' },
      { title: 'Rich Error Context', desc: 'Failures carry a machine-readable error code and a human-readable message, instead of a bare 401.' },
      { title: 'Zero Overhead Off', desc: 'Disabled, the FlowRecorder short-circuits on entry: no channels, no writes, no allocations.' },
      { title: 'Queryable',         desc: 'Query flows by user, client, grant type, status, or time range through the admin API.' },
    ],
    steps: [
      { title: 'Flow created',         desc: 'Authentication request arrives. Compass creates a flow with realm, client, grant type, IP, and user agent.' },
      { title: 'Steps recorded',       desc: 'Every phase of authentication (authorize, credential check, MFA, token exchange) is recorded with its timing and outcome.' },
      { title: 'User identified',      desc: 'After successful credential validation, the user ID is attached to the flow, linking it for future queries.' },
      { title: 'Flow completed',       desc: 'Authentication finishes. The flow is marked success, failure, or expired with total duration in milliseconds.' },
    ],
  },
  {
    slug: 'abyss',
    name: 'Abyss',
    tagline: 'Identity Provider Federation',
    description: 'Connects FerrisKey to external identity providers. Users authenticate via Google, GitHub, Discord, or any OAuth2 and OIDC provider, and FerrisKey handles provisioning, linking, and attribute mapping.',
    docsPath: '/en/modules/abyss/overview',
    pills: ['Google SSO', 'GitHub SSO', 'Discord SSO', 'OIDC', 'OAuth2', 'Account Linking', 'Auto Provisioning', 'Attribute Mapping', 'Azure AD', 'Corporate SSO'],
    features: [
      { title: 'OAuth2 & OIDC',       desc: 'Connect any OAuth2 or OpenID Connect provider: Google, GitHub, Discord, Entra ID, or a custom corporate IdP.' },
      { title: 'Auto Provisioning',   desc: 'New users are created in FerrisKey on their first federated login, with nobody provisioning them by hand.' },
      { title: 'Account Linking',     desc: 'A user can link several providers to one FerrisKey account, with Google and GitHub pointing at the same identity.' },
      { title: 'Attribute Mapping',   desc: 'Map external claims (email, name, preferred_username) to FerrisKey user fields with required/optional rules.' },
      { title: 'Secret Encryption',   desc: 'Client secrets are encrypted at rest and never exposed in plaintext through the admin API.' },
      { title: 'Per-Realm Config',    desc: 'Each realm has its own provider registry. Isolate SSO configuration between tenants or environments.' },
    ],
    steps: [
      { title: 'User chooses provider',   desc: 'On the login page, the user selects an external provider (e.g. "Sign in with Google").' },
      { title: 'Redirected to IdP',       desc: 'FerrisKey builds the OAuth2 authorization URL and redirects the user to the external provider.' },
      { title: 'Callback processed',      desc: 'The IdP redirects back with an authorization code. Abyss exchanges it for tokens and fetches user attributes.' },
      { title: 'User provisioned',        desc: 'Abyss matches or creates a FerrisKey user, applies attribute mappings, and issues FerrisKey tokens.' },
    ],
  },
  {
    slug: 'aegis',
    name: 'Aegis',
    tagline: 'Scopes & Protocol Mappers',
    description: 'Controls exactly what data flows into your tokens. Client scopes define named collections of claims; protocol mappers extract data from users and inject it into JWTs.',
    docsPath: '/en/modules/aegis/overview',
    pills: ['JWT Claims', 'Custom Scopes', 'Protocol Mappers', 'OIDC Standard Scopes', 'openid', 'email', 'profile', 'Role Claims', 'Custom Claims', 'Token Control'],
    features: [
      { title: 'Client Scopes',       desc: 'Named collections of claims, assigned per client, so different apps get different token contents.' },
      { title: 'Protocol Mappers',    desc: 'Rules that extract data from the user and inject it as JWT claims. Map roles, attributes, or hardcoded values.' },
      { title: 'Standard OIDC',       desc: 'Ships with openid, profile, email, roles, address, phone, and offline_access seeded into every realm.' },
      { title: 'Default vs Optional', desc: 'Default scopes are always included. Optional scopes are only included when the client explicitly requests them.' },
      { title: 'Custom Claims',       desc: 'Add business-specific claims (department, plan tier, feature flags) through custom protocol mapper rules.' },
      { title: 'Minimal Exposure',    desc: 'Public mobile apps get sub and email. Internal admin tools get realm_roles. Fine-grained data minimization.' },
    ],
    steps: [
      { title: 'Client requests scopes',  desc: 'During authentication, the client specifies which scopes it needs (e.g., openid email profile).' },
      { title: 'Scopes resolved',         desc: 'Aegis looks up the client\'s default scopes and merges in any requested optional scopes.' },
      { title: 'Mappers executed',        desc: 'Each protocol mapper in the resolved scopes runs, reading the user object and producing claims.' },
      { title: 'Claims assembled',        desc: 'All claims are merged into the final JWT payload and signed. Only the requested data is included.' },
    ],
  },
  {
    slug: 'webhooks',
    name: 'Webhooks',
    tagline: 'Event-Driven Extensibility',
    description: 'Pushes HTTP notifications to external systems when something happens in FerrisKey: a user created, a role assigned, a secret rotated. It bridges the identity layer to the rest of your stack.',
    docsPath: '/en/modules/webhooks/overview',
    pills: ['HTTP POST', 'Event Subscriptions', 'Custom Headers', 'Auth Header', 'Real-Time Sync', 'CRM Integration', 'Slack Notifications', 'PagerDuty', 'SIEM Forwarding', 'Lifecycle Events'],
    features: [
      { title: 'Event Subscriptions',  desc: 'Subscribe each webhook to the events it cares about: user.created, user.role.assigned, client.deleted, and 35 more.' },
      { title: 'Custom Headers',       desc: 'Add Authorization, X-Webhook-Secret, or any custom header to authenticate deliveries at the receiving end.' },
      { title: 'Per-Realm Scope',      desc: 'Webhooks are scoped to a realm. Each tenant can have its own set of endpoints and subscriptions.' },
      { title: 'Multiple Endpoints',   desc: 'Register as many webhooks as needed. The same event fans out to all registered subscribers in parallel.' },
      { title: 'Last Triggered At',    desc: 'Each webhook records when it last fired, which is what you want when debugging a silent integration.' },
      { title: 'Decoupled Design',     desc: 'Your app reacts to identity events without polling FerrisKey. Clean event-driven integration.' },
    ],
    steps: [
      { title: 'Register webhook',       desc: 'Create a webhook with a target URL, optional custom headers, and a name. Scoped to a realm.' },
      { title: 'Subscribe to events',    desc: 'Add event subscriptions, choosing which lifecycle events should trigger the webhook.' },
      { title: 'Event fires',            desc: 'A matching event occurs in the realm. FerrisKey builds the payload and dispatches an HTTP POST.' },
      { title: 'Your system responds',   desc: 'Your endpoint receives the structured payload and reacts: send an email, sync a CRM, trigger a workflow.' },
    ],
  },
]
