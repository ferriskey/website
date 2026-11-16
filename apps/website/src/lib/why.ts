export type Text = { en: string; fr: string }

const t = (en: string, fr: string): Text => ({ en, fr })

export const contactEmail = 'nathael@ferriskey.rs'

export const why = {
  meta: {
    title: 'Why an IAM? | FerrisKey',
    description:
      'Why your applications need Identity & Access Management, when it becomes urgent, and how FerrisKey handles users, sign-in flows, MFA, passkeys, security and audit.',
  },

  hero: {
    label: t('Why an IAM', 'Pourquoi un IAM'),
    title: t(
      'Every application ends up asking the same question: who are you, and what are you allowed to do?',
      "Chaque application finit par poser la même question : qui es-tu, et qu'as-tu le droit de faire ?",
    ),
    description: t(
      'An IAM (Identity & Access Management) answers that question in one place, for all your applications. This page explains why it matters, when it becomes urgent, and how FerrisKey does it.',
      "Un IAM (Identity & Access Management) répond à cette question à un seul endroit, pour toutes vos applications. Cette page explique pourquoi c'est utile, quand ça devient urgent, et comment FerrisKey s'y prend.",
    ),
  },

  anchors: [
    { id: 'minute', label: t('In one minute', 'En une minute') },
    { id: 'moments', label: t('When it breaks', 'Quand ça casse') },
    { id: 'manages', label: t('What an IAM handles', 'Ce que gère un IAM') },
    { id: 'options', label: t('Build, buy or self-host', 'Coder, acheter ou héberger') },
    { id: 'code', label: t('In your code', 'Côté code') },
    { id: 'faq', label: t('FAQ', 'FAQ') },
    { id: 'help', label: t('Contact us', 'Nous contacter') },
  ],

  minute: {
    label: t('In one minute', 'En une minute'),
    audience: t('For everyone.', 'Pour tout le monde.'),
    title: t('Think of an office building.', 'Pensez à un immeuble de bureaux.'),
    paragraphs: [
      t(
        'Without a front desk, every office fits its own lock and hands out its own keys. To get everywhere, an employee carries twenty keys. When they leave, someone has to find every office that gave them one. And nobody knows who walked into which room last week.',
        "Sans accueil central, chaque bureau pose sa propre serrure et distribue ses propres clés. Pour entrer partout, un employé porte vingt clés. Quand il s'en va, il faut retrouver chaque bureau qui lui en a donné une. Et personne ne sait qui est entré où la semaine dernière.",
      ),
      t(
        'With a front desk, each person gets one badge. The desk decides which doors that badge opens. It can switch the badge off in a second, and it keeps a record of every pass.',
        "Avec un accueil, chaque personne reçoit un seul badge. L'accueil décide quelles portes ce badge ouvre. Il peut le désactiver en une seconde, et il garde la trace de chaque passage.",
      ),
    ],
    punchline: t(
      '<strong>An IAM is that front desk for your software.</strong> Your applications stop handling passwords themselves. They ask the IAM: “is this person really who they claim to be? Are they allowed through this door?”',
      "<strong>Un IAM, c'est cet accueil pour vos logiciels.</strong> Vos applications ne gèrent plus les mots de passe elles-mêmes. Elles demandent à l'IAM : « cette personne est bien qui elle prétend être ? Elle a le droit d'ouvrir cette porte ? »",
    ),
  },

  moments: {
    label: t('When it breaks', 'Quand ça casse'),
    audience: t('For CTOs and founders. No technical background needed.', 'Pour les CTO et les fondateurs. Lisible sans être technique.'),
    title: t('The five moments when a login form stops being enough.', "Les 5 moments où un simple formulaire de login ne suffit plus."),
    description: t(
      'At first, a login form inside the app is fine. The need for an IAM almost always shows up at one of these moments.',
      "Au début, un formulaire de login dans l'application suffit. Le besoin d'un IAM arrive presque toujours à l'un de ces moments.",
    ),
    seeLabel: t('What you see', "Ce qu'on voit"),
    costLabel: t('What it costs', 'Ce que ça coûte'),
    iamLabel: t('With an IAM', 'Avec un IAM'),
    items: [
      {
        title: t('A second application shows up', 'Une deuxième application arrive'),
        see: t(
          'A mobile app, a back office, a second product. The login has to be rebuilt, or copied from the first one.',
          'Une app mobile, un back-office, un deuxième produit. Il faut refaire le login, ou copier le code du premier.',
        ),
        cost: t(
          'Two user databases, two passwords for your customers, two places to secure, and different bugs in each.',
          'Deux bases d’utilisateurs, deux mots de passe pour vos clients, deux endroits à sécuriser, et des bugs différents dans chacun.',
        ),
        iam: t(
          'Every application hands sign-in to the same server. One account, one session, everywhere.',
          'Toutes les applications délèguent la connexion au même serveur. Un compte, une session, partout.',
        ),
      },
      {
        title: t('A customer requires two-factor authentication', 'Un client exige la double authentification'),
        see: t(
          'A prospect’s security questionnaire has the line “MFA enforced for all users: yes / no”. You tick “no”, and the deal stalls.',
          'Le questionnaire sécurité d’un prospect contient la ligne « MFA obligatoire pour tous les utilisateurs : oui / non ». Vous cochez « non », et la vente bloque.',
        ),
        cost: t(
          'Building TOTP, enrolment, recovery codes and lockout after failed attempts, then maintaining all of it. And the next customer will ask for passkeys.',
          'Coder le TOTP, l’enrôlement, les codes de secours, le verrouillage après erreurs, puis maintenir tout ça. Et le client suivant demandera des passkeys.',
        ),
        iam: t(
          'You turn MFA on for the realm, or for a single role. Every user it covers is guided through setup at their next sign-in.',
          'On active la double authentification sur le realm, ou seulement pour un rôle. Chaque utilisateur concerné est guidé pour l’activer à sa prochaine connexion.',
        ),
      },
      {
        title: t('Your first large customer asks for SSO', 'Votre premier gros client demande le SSO'),
        see: t(
          'The contract is nearly signed. Then the customer’s security team asks: “can your users sign in with our Okta / Entra ID? And we want to manage who has access ourselves.”',
          'Le contrat est presque signé. Puis l’équipe sécurité du client demande : « vos utilisateurs peuvent se connecter avec notre Okta / Entra ID ? Et on veut gérer nous-mêmes qui a accès. »',
        ),
        cost: t(
          'Weeks of unplanned development, or a contract that slips to next quarter.',
          'Des semaines de développement imprévues, ou un contrat qui glisse au trimestre suivant.',
        ),
        iam: t(
          'Each customer becomes an organization, connected to its own identity provider. It is configuration, not a project.',
          'Chaque client devient une organisation, branchée sur son propre fournisseur d’identité. C’est de la configuration, pas un projet.',
        ),
      },
      {
        title: t('Someone leaves the company', 'Quelqu’un quitte l’entreprise'),
        see: t(
          'A departure, at your company or at a customer’s. Their accounts stay active in three tools nobody thought to check.',
          'Un départ, chez vous ou chez un client. Ses comptes restent actifs dans trois outils que personne n’a pensé à vérifier.',
        ),
        cost: t(
          'Open access to data that is no longer theirs to see. That is a security incident, even if nobody uses it.',
          'Un accès ouvert à des données qui ne le concernent plus. C’est un incident de sécurité, même si personne ne l’utilise.',
        ),
        iam: t(
          'You disable the account in one place, and it can no longer sign in anywhere. Applications that support it are notified and close the open session.',
          'On désactive le compte à un seul endroit, et il ne peut plus se connecter nulle part. Les applications qui le supportent sont prévenues et ferment la session ouverte.',
        ),
      },
      {
        title: t('An audit, or an incident', 'Un audit, ou un incident'),
        see: t(
          'A customer asks for your access policy, an ISO 27001 auditor wants evidence, or an account was compromised and you need to understand how.',
          'Un client demande votre politique d’accès, un auditeur ISO 27001 veut des preuves, ou un compte a été compromis et il faut comprendre comment.',
        ),
        cost: t(
          'Days spent rebuilding the history from scattered logs, when they exist at all.',
          'Des jours à reconstituer l’historique à partir de logs dispersés, quand ils existent.',
        ),
        iam: t(
          'Every sign-in, every failure, every permission change is recorded in one place, in a log that cannot be edited without it showing.',
          'Chaque connexion, chaque échec, chaque changement de droit est enregistré au même endroit, dans un journal qu’on ne peut pas modifier sans que ça se voie.',
        ),
      },
    ],
  },

  manages: {
    label: t('What an IAM handles', 'Ce que gère un IAM'),
    audience: t('For CTOs and developers.', 'Pour les CTO et les devs.'),
    title: t('Everything you would otherwise build yourself.', 'Tout ce que vous auriez dû coder vous-même.'),
    description: t(
      'Each topic starts with one plain sentence, then gives the detail.',
      'Chaque sujet commence par une phrase simple, puis donne le détail.',
    ),
    topics: [
      {
        id: 'governance',
        tab: t('Users', 'Utilisateurs'),
        title: t('User governance', 'Gouvernance des utilisateurs'),
        plain: t(
          'Know who has access to what, and change it in one place.',
          'Savoir qui a accès à quoi, et pouvoir le changer à un seul endroit.',
        ),
        bullets: [
          {
            title: t('Full lifecycle.', 'Cycle de vie complet.'),
            text: t(
              'Create, enable, disable. Someone who leaves loses access everywhere in one action.',
              'Création, activation, désactivation. Une personne qui part perd ses accès partout en une action.',
            ),
          },
          {
            title: t('Roles and permissions.', 'Rôles et permissions.'),
            text: t(
              'A role bundles permissions. You grant the role, not twenty permissions one by one.',
              'Un rôle regroupe des droits. On donne le rôle, pas vingt droits un par un.',
            ),
          },
          {
            title: t('Nested groups.', 'Groupes hiérarchiques.'),
            text: t(
              'Groups nest: a member of “Paris team” inherits what “Sales” is allowed to do.',
              'Les groupes s’imbriquent : un membre de « Équipe Paris » hérite des droits de « Ventes ».',
            ),
          },
          {
            title: t('B2B organizations.', 'Organisations B2B.'),
            text: t(
              'Each customer has its own members, groups and attributes, isolated from other customers.',
              'Chaque client a ses membres, ses groupes et ses attributs, isolés des autres clients.',
            ),
          },
          {
            title: t('Required actions.', 'Actions obligatoires.'),
            text: t(
              'Make a user verify their email, change their password or set up MFA before they reach the application.',
              'Vous pouvez imposer à un utilisateur de vérifier son e-mail, changer son mot de passe ou activer la double authentification avant d’accéder à l’application.',
            ),
          },
          {
            title: t('Self-service.', 'Self-service.'),
            text: t(
              'Users manage their own password, authenticator app and passkeys. Fewer support tickets.',
              'Chaque utilisateur gère lui-même son mot de passe, son application d’authentification et ses passkeys. Moins de tickets pour le support.',
            ),
          },
          {
            title: t('Fine-grained rules.', 'Règles d’accès fines.'),
            text: t(
              'To go beyond roles (“a manager can approve their team’s expenses, up to €5,000”), FerrisKey evaluates Cedar policies and answers the AuthZEN standard.',
              'Pour aller au-delà des rôles (« un manager peut valider les notes de frais de son équipe, sous 5 000 € »), FerrisKey évalue des politiques Cedar et répond au standard AuthZEN.',
            ),
          },
        ],
      },
      {
        id: 'flows',
        tab: t('Flows', 'Flows'),
        title: t('Sign-in flows', 'Les flows d’authentification'),
        plain: t(
          'Each kind of application signs in differently. The IAM knows the right way for each one.',
          'Chaque type d’application se connecte d’une façon différente. L’IAM connaît la bonne façon pour chacune.',
        ),
        table: {
          head: [t('Your case', 'Votre cas'), t('The flow', 'Le flow'), t('What happens', 'Ce qui se passe')],
          rows: [
            [
              t('Web app, SPA, mobile app', 'Application web, SPA, app mobile'),
              t('Authorization Code + PKCE', 'Authorization Code + PKCE'),
              t('The user signs in on the FerrisKey page, the app receives a token', 'L’utilisateur se connecte sur la page de FerrisKey, l’app reçoit un jeton'),
            ],
            [
              t('A service calling an API', 'Service qui appelle une API'),
              t('Client Credentials', 'Client Credentials'),
              t('The service authenticates with its own secret, no user involved', 'Le service s’authentifie avec son propre secret, sans utilisateur'),
            ],
            [
              t('CLI, TV, device without a browser', 'CLI, TV, appareil sans navigateur'),
              t('Device Code', 'Device Code'),
              t('The device shows a code, the user approves on their phone', 'L’appareil affiche un code, l’utilisateur valide sur son téléphone'),
            ],
            [
              t('A service acting for a user, an AI agent', 'Service qui agit pour un utilisateur, agent IA'),
              t('Token Exchange', 'Token Exchange'),
              t('A token is swapped for a narrower one, with the delegation chain', 'Un jeton est échangé contre un jeton plus restreint, avec la chaîne de délégation'),
            ],
            [
              t('“Sign in with Google / GitHub”', '« Se connecter avec Google / GitHub »'),
              t('OIDC federation', 'Fédération OIDC'),
              t('FerrisKey delegates to an external provider', 'FerrisKey délègue à un fournisseur externe'),
            ],
            [
              t('Company directory', 'Annuaire d’entreprise'),
              t('LDAP, Active Directory', 'LDAP, Active Directory'),
              t('Accounts come from the existing directory', 'Les comptes viennent de l’annuaire existant'),
            ],
            [
              t('Legacy application', 'Application ancienne'),
              t('SAML 2.0', 'SAML 2.0'),
              t('FerrisKey acts as the SAML identity provider', 'FerrisKey joue le rôle de fournisseur d’identité SAML'),
            ],
          ],
        },
        note: t(
          '<strong>When a user cannot sign in</strong>, Compass records every step of every sign-in: password checked, MFA requested, account locked. Support sees where it stopped instead of guessing.',
          '<strong>Quand un utilisateur n’arrive pas à se connecter</strong>, Compass enregistre chaque étape de chaque connexion : mot de passe vérifié, double authentification demandée, compte verrouillé. Le support voit où ça a bloqué au lieu de deviner.',
        ),
      },
      {
        id: 'mfa',
        tab: t('MFA', 'Double auth'),
        title: t('Two-factor authentication', 'Double authentification'),
        plain: t('A stolen password is no longer enough to get in.', 'Un mot de passe volé ne suffit plus pour entrer.'),
        bullets: [
          {
            title: t('Authenticator apps (TOTP).', 'Application d’authentification (TOTP).'),
            text: t(
              'Works with Google Authenticator, 1Password, Authy and every standard app.',
              'Compatible avec Google Authenticator, 1Password, Authy et toutes les apps standard.',
            ),
          },
          {
            title: t('Enforced or optional, your call.', 'Obligatoire ou facultative, au choix.'),
            text: t(
              'On for the whole realm, for a single role (administrators, for example), or left to each user.',
              'Activée pour tout le realm, pour un seul rôle (par exemple les administrateurs), ou laissée au choix de chaque utilisateur.',
            ),
          },
          {
            title: t('Guided enrolment.', 'Enrôlement guidé.'),
            text: t(
              'Users it covers are walked through setup at their next sign-in. They cannot skip it.',
              'L’utilisateur concerné est guidé à sa prochaine connexion. Il ne peut pas l’ignorer.',
            ),
          },
          {
            title: t('Recovery codes.', 'Codes de récupération.'),
            text: t('So someone who lost their phone is not locked out.', 'Pour ne pas bloquer quelqu’un qui a perdu son téléphone.'),
          },
          {
            title: t('Lockout.', 'Verrouillage.'),
            text: t(
              'Wrong codes count as failed sign-ins. After 10 failures (configurable), the account is locked for 15 minutes.',
              'Les mauvais codes comptent comme des échecs de connexion. Après 10 échecs (réglable), le compte est verrouillé 15 minutes.',
            ),
          },
          {
            title: t('Magic links.', 'Liens magiques.'),
            text: t(
              'Passwordless sign-in by email, when that is the right trade-off for your users.',
              'Connexion sans mot de passe par e-mail, quand c’est le bon compromis pour vos utilisateurs.',
            ),
          },
        ],
      },
      {
        id: 'passkeys',
        tab: t('Passkeys', 'Passkeys'),
        title: t('Passkeys', 'Passkeys'),
        plain: t(
          'Sign in with a fingerprint, a face or the phone’s unlock code. No password to remember, nothing to phish.',
          'Se connecter avec son empreinte, son visage ou le code de son téléphone. Pas de mot de passe à retenir, rien à voler par hameçonnage.',
        ),
        bullets: [
          {
            title: t('FIDO2 / WebAuthn standard.', 'Standard FIDO2 / WebAuthn.'),
            text: t(
              'Works with Face ID, Touch ID, Windows Hello, Android and hardware security keys.',
              'Fonctionne avec Face ID, Touch ID, Windows Hello, Android et les clés de sécurité physiques.',
            ),
          },
          {
            title: t('One gesture.', 'Connexion en un geste.'),
            text: t(
              'A passkey button appears next to the password field. A verified passkey signs the user in directly.',
              'Un bouton passkey apparaît à côté du champ mot de passe. Une passkey vérifiée connecte l’utilisateur directement.',
            ),
          },
          {
            title: t('Counts as the second factor.', 'Compte aussi comme double authentification.'),
            text: t(
              'A user with a passkey does not also have to type a TOTP code.',
              'Un utilisateur qui a une passkey n’a pas besoin de taper un code TOTP en plus.',
            ),
          },
          {
            title: t('Phishing-resistant.', 'Résiste au phishing.'),
            text: t(
              'A passkey is bound to your application’s domain. A fake site cannot use it.',
              'Une passkey est liée au domaine de votre application. Un faux site ne peut pas l’utiliser.',
            ),
          },
        ],
      },
      {
        id: 'security',
        tab: t('Security', 'Sécurité'),
        title: t('Security', 'Sécurité'),
        plain: t(
          'The classic mistakes of home-made login systems are handled by default.',
          'Les erreurs classiques des systèmes de login maison sont traitées par défaut.',
        ),
        bullets: [
          {
            title: t('Passwords hashed with Argon2id,', 'Mots de passe hachés avec Argon2id,'),
            text: t(
              'the algorithm recommended today. A password is never stored in clear text.',
              'l’algorithme recommandé aujourd’hui. Un mot de passe n’est jamais stocké en clair.',
            ),
          },
          {
            title: t('A password policy aligned with the CNIL.', 'Politique de mot de passe alignée sur la CNIL.'),
            text: t(
              'By default: at least 12 characters, an entropy check, common passwords rejected. Configurable per realm.',
              'Par défaut : 12 caractères minimum, contrôle de l’entropie, mots de passe trop courants refusés. Réglable par realm.',
            ),
          },
          {
            title: t('Brute-force lockout,', 'Verrouillage contre la force brute,'),
            text: t('shared between password and MFA attempts.', 'partagé entre mot de passe et double authentification.'),
          },
          {
            title: t('Sensitive operations protected.', 'Opérations sensibles protégées.'),
            text: t(
              'Changing a password or removing a passkey requires re-authenticating within the last 5 minutes. A stolen second factor cannot enrol itself.',
              'Changer de mot de passe ou retirer une passkey demande de se réauthentifier dans les 5 dernières minutes. Un second facteur volé ne peut pas s’enregistrer seul.',
            ),
          },
          {
            title: t('Secrets encrypted at rest.', 'Secrets chiffrés en base.'),
            text: t(
              'Token signing keys and TOTP seeds can be encrypted in PostgreSQL. A copy of the database is not enough to use them.',
              'Les clés de signature des jetons et les secrets TOTP peuvent être chiffrés dans PostgreSQL. Une copie de la base ne suffit pas à les utiliser.',
            ),
          },
          {
            title: t('Written in Rust.', 'Écrit en Rust.'),
            text: t(
              'A whole family of memory-safety flaws is ruled out by the language.',
              'Toute une famille de failles mémoire est exclue par le langage.',
            ),
          },
        ],
      },
      {
        id: 'audit',
        tab: t('Audit', 'Audit'),
        title: t('Audit', 'Audit'),
        plain: t(
          'Answer “who did what, and when?” without digging through ten systems.',
          'Pouvoir répondre à « qui a fait quoi, et quand ? » sans fouiller dix systèmes.',
        ),
        bullets: [
          {
            title: t('One security log per realm (SeaWatch).', 'Un journal de sécurité par realm (SeaWatch).'),
            text: t(
              'Sign-ins, failures, opened sessions, roles granted and by whom, client secrets read, clients deleted.',
              'Connexions, échecs, sessions ouvertes, rôles donnés et par qui, lecture d’un secret client, suppression d’un client.',
            ),
          },
          {
            title: t('Tamper-evident.', 'Infalsifiable en silence.'),
            text: t(
              'Each event is chained to the previous one by a hash. If someone edits a row directly in the database, the chain breaks and it shows.',
              'Chaque événement est chaîné au précédent par un hachage. Si quelqu’un modifie une ligne directement dans la base, la chaîne casse et ça se voit.',
            ),
          },
          {
            title: t('Ready for an investigation.', 'Prêt pour une investigation.'),
            text: t(
              '“Which sessions did this account open?”, “Who granted this role?”: each question is a filter.',
              '« Quelles sessions ce compte a ouvertes ? », « Qui a donné ce rôle ? » : chaque question est un filtre.',
            ),
          },
          {
            title: t('Readable by your tools.', 'Lisible par vos outils.'),
            text: t(
              'Events are read through an API, to forward them to Splunk, Elastic or Datadog.',
              'Les événements se lisent par une API, pour les envoyer dans Splunk, Elastic ou Datadog.',
            ),
          },
          {
            title: t('What we do not promise:', 'Ce qu’on ne promet pas :'),
            text: t(
              'the log detects a change, it does not prevent it. For long-term retention, copy events to external storage.',
              'le journal détecte une modification, il ne l’empêche pas. Pour une conservation longue durée, copiez les événements vers un stockage externe.',
            ),
          },
        ],
      },
    ],
  },

  options: {
    label: t('Build, buy or self-host', 'Coder, acheter ou héberger'),
    audience: t('For CTOs.', 'Pour les CTO.'),
    title: t('Three ways to get an IAM. None of them is free.', 'Trois façons d’avoir un IAM. Aucune n’est gratuite.'),
    description: t('They just do not cost the same thing.', 'Elles ne coûtent simplement pas la même chose.'),
    head: [
      t('', ''),
      t('Home-made auth', 'Auth maison'),
      t('SaaS (Auth0, Clerk…)', 'SaaS (Auth0, Clerk…)'),
      t('Self-hosted open source (Keycloak, FerrisKey)', 'Open source auto-hébergé (Keycloak, FerrisKey)'),
    ],
    rows: [
      {
        label: t('Getting started', 'Pour démarrer'),
        cells: [t('Quick for a simple login', 'Rapide pour un simple login'), t('Very quick', 'Très rapide'), t('A day to install', 'Une journée pour installer')],
      },
      {
        label: t('MFA, passkeys, SSO, audit', 'Double auth, passkeys, SSO, audit'),
        cells: [
          t('Each need is a new project', 'Chaque besoin est un nouveau projet'),
          t('Included, often in the expensive plans', 'Inclus, souvent dans les offres chères'),
          t('Included', 'Inclus'),
        ],
      },
      {
        label: t('As you grow', 'Quand on grandit'),
        cells: [
          t('Maintenance grows with every feature', 'Le coût de maintenance grandit avec chaque fonctionnalité'),
          t('The bill follows your active users', 'La facture suit le nombre d’utilisateurs actifs'),
          t('Cost follows infrastructure, not users', 'Le coût suit l’infrastructure, pas les utilisateurs'),
        ],
      },
      {
        label: t('Your data', 'Vos données'),
        cells: [t('With you', 'Chez vous'), t('With the vendor, often outside Europe', 'Chez le fournisseur, souvent hors d’Europe'), t('With you', 'Chez vous')],
      },
      {
        label: t('Security', 'Sécurité'),
        cells: [
          t('You carry every flaw', 'Vous portez chaque faille'),
          t('Carried by the vendor', 'Portée par le fournisseur'),
          t('Open, auditable code, patched by the project', 'Code ouvert, auditable, mis à jour par le projet'),
        ],
      },
      {
        label: t('If you want to leave', 'Si vous voulez partir'),
        cells: [
          t('—', '—'),
          t('Hard migration, especially passwords', 'Migration difficile, surtout les mots de passe'),
          t('Open standards (OIDC, SAML), no lock-in', 'Standards ouverts (OIDC, SAML), pas d’enfermement'),
        ],
      },
    ],
    opinion: t(
      '<strong>Our take:</strong> home-made auth holds as long as you have one application and no enterprise customer. SaaS is the fastest start, but the bill and the dependency grow with you. Self-hosted open source means running one more service, in exchange for control and a predictable cost.',
      '<strong>Notre avis :</strong> l’auth maison tient tant qu’il y a une seule application et pas de client entreprise. Le SaaS est le plus rapide pour démarrer, mais la facture et la dépendance grandissent avec vous. L’open source auto-hébergé demande d’opérer un service de plus, en échange du contrôle et d’un coût prévisible.',
    ),
  },

  ferriskey: {
    label: t('Why FerrisKey', 'Pourquoi FerrisKey'),
    audience: t('For CTOs and teams coming from Keycloak.', 'Pour les CTO et les équipes qui viennent de Keycloak.'),
    title: t('The same standards, on a lighter base.', 'Les mêmes standards, sur une base plus légère.'),
    description: t(
      'Keycloak proved that an open-source IAM can run production. FerrisKey speaks the same standards, on a base that is lighter and simpler to run.',
      'Keycloak a prouvé qu’un IAM open source tient la production. FerrisKey reprend les mêmes standards, avec une base plus légère et plus simple à opérer.',
    ),
    bullets: [
      {
        id: 'light',
        title: t('Lightweight.', 'Léger.'),
        text: t(
          'At most 618 MiB of memory in our benchmarks, against 823 MiB for Keycloak 26. It starts at 62 MiB, and often uses half the CPU at the same rate.',
          'Au maximum 618 Mo de mémoire dans nos benchmarks, contre 823 Mo pour Keycloak 26. Il démarre à 62 Mo, et consomme souvent deux fois moins de CPU au même débit.',
        ),
        link: { label: t('Full benchmarks', 'Voir les benchmarks complets'), path: '/en/kubernetes/benchmarks' },
      },
      {
        id: 'b2b',
        title: t('Built for B2B.', 'Pensé pour le B2B.'),
        text: t(
          'Organizations, groups, attributes and per-customer federation are built in, not bolted on.',
          'Organisations, groupes, attributs et fédération par client sont intégrés, pas ajoutés après coup.',
        ),
      },
      {
        id: 'included',
        title: t('Everything above is included.', 'Tout ce qui est décrit plus haut est inclus.'),
        text: t(
          'MFA, passkeys, audit, fine-grained rules: everything is open source. There is no paid “enterprise” edition.',
          'Double authentification, passkeys, audit, règles d’accès fines : tout est open source. Il n’y a pas d’édition « entreprise » payante.',
        ),
      },
      {
        id: 'agents',
        title: t('Ready for AI agents.', 'Prêt pour les agents IA.'),
        text: t(
          'Service accounts, token exchange with a delegation chain, MCP support.',
          'Comptes de service, échange de jetons avec chaîne de délégation, support MCP.',
        ),
      },
      {
        id: 'migration',
        title: t('Migration from Keycloak.', 'Migration depuis Keycloak.'),
        text: t(
          'One command imports the realm, clients, roles and users. Passwords, role assignments and groups have to be redone: the docs say so, line by line.',
          'Une commande importe le realm, les clients, les rôles et les utilisateurs. Les mots de passe, les attributions de rôles et les groupes restent à reprendre : on le dit dans la doc, ligne par ligne.',
        ),
        link: { label: t('Migration guide', 'Guide de migration'), path: '/en/cli/import/keycloak' },
      },
      {
        id: 'oss',
        title: t('Written in Rust, licensed Apache-2.0.', 'Écrit en Rust, sous licence Apache-2.0.'),
        text: t('Developed in the open on GitHub.', 'Développé en public sur GitHub.'),
      },
    ],
  },

  code: {
    label: t('In your code', 'Côté code'),
    audience: t('For developers.', 'Pour les devs.'),
    title: t('Your application never sees a password.', 'Votre application ne voit jamais un mot de passe.'),
    description: t('It does three things:', 'Elle fait trois choses :'),
    steps: [
      t('It redirects the user to FerrisKey to sign in.', 'Elle redirige l’utilisateur vers FerrisKey pour la connexion.'),
      t(
        'It receives a signed token (a JWT) that says who the user is and what they can do.',
        'Elle reçoit un jeton signé (un JWT) qui dit qui est l’utilisateur et ce qu’il peut faire.',
      ),
      t('It checks that token’s signature on every request.', 'Elle vérifie la signature de ce jeton à chaque requête.'),
    ],
    flow: [t('Browser', 'Navigateur'), t('Your app', 'Votre app'), t('FerrisKey', 'FerrisKey'), t('Your API', 'Votre API')],
    flowSteps: [t('signs in', 'se connecte'), t('redirects', 'redirige'), t('token', 'jeton')],
    snippetLabel: t('Verifying a token in a Node.js API', 'Vérifier un jeton dans une API Node.js'),
    snippetComment: t(
      'The public keys address is announced by the OIDC discovery document',
      "L'adresse des clés publiques est annoncée par le document de découverte OIDC",
    ),
    after: t(
      'MFA, passkeys and lockout need no code on your side: it all happens on the FerrisKey sign-in page. Any OIDC library works, there is no proprietary SDK to adopt.',
      'La double authentification, les passkeys et le verrouillage ne demandent aucune ligne de code de votre côté : tout se passe sur la page de connexion de FerrisKey. N’importe quelle bibliothèque OIDC fonctionne, il n’y a pas de SDK maison à adopter.',
    ),
    link: t('Run FerrisKey locally with Docker', 'Lancer FerrisKey en local avec Docker'),
  },

  faq: {
    label: t('FAQ', 'FAQ'),
    title: t('Frequently asked questions', 'Questions fréquentes'),
    items: [
      {
        q: t('What is the difference with Auth0 or Clerk?', 'C’est quoi la différence avec Auth0 ou Clerk ?'),
        a: t(
          'They are hosted services, billed by the number of users. FerrisKey is open-source software you host yourself: your data stays with you and the cost does not depend on how many users you have.',
          'Ce sont des services hébergés, facturés selon le nombre d’utilisateurs. FerrisKey est un logiciel open source que vous hébergez vous-même : vos données restent chez vous et le coût ne dépend pas du nombre d’utilisateurs.',
        ),
      },
      {
        q: t('We already run Keycloak. Why switch?', 'On utilise déjà Keycloak. Pourquoi changer ?'),
        a: t(
          'If Keycloak works for you, there is no rush. Teams moving to FerrisKey usually want a lighter service to run on Kubernetes, and a native B2B model. Migration happens step by step, with an import that states exactly what it brings over and what it leaves behind.',
          'Si Keycloak vous convient, rien ne presse. Les équipes qui passent à FerrisKey cherchent en général un service plus léger à opérer sur Kubernetes, et un modèle B2B natif. La migration se fait par étapes, avec un import qui indique précisément ce qu’il reprend et ce qu’il laisse.',
        ),
      },
      {
        q: t(
          'A customer requires MFA. How long does it take to turn on?',
          'Mon client exige la double authentification. Combien de temps pour l’activer ?',
        ),
        a: t(
          'It is a setting on the realm or on a role. Your users are guided through setup at their next sign-in. Your application does not change.',
          'C’est un réglage sur le realm ou sur un rôle. Vos utilisateurs sont guidés pour l’activer à leur prochaine connexion. Votre application n’a rien à changer.',
        ),
      },
      {
        q: t('Does it help with an ISO 27001 or SOC 2 audit?', 'Ça m’aide pour un audit ISO 27001 ou SOC 2 ?'),
        a: t(
          'FerrisKey does not certify you. It gives you evidence: password policy, enforced MFA, a log of sign-ins and permission changes. These questions come up in every audit.',
          'FerrisKey ne vous certifie pas. Il vous donne des preuves : politique de mot de passe, double authentification obligatoire, journal des accès et des changements de droits. Ce sont des questions qui reviennent dans tous les audits.',
        ),
      },
      {
        q: t('How much does it cost?', 'Ça coûte combien ?'),
        a: t(
          'The software is free, and all of it is open source: no paid edition, no reserved feature. You pay for your infrastructure. What we sell is our time: support, consulting and help with your migration. Write to <a href="mailto:{email}">{email}</a>.',
          'Le logiciel est gratuit, et tout est open source : il n’y a pas d’édition payante ni de fonctionnalité réservée. Vous payez votre infrastructure. Ce que nous vendons, c’est notre temps : support, conseil et accompagnement de votre migration. Écrivez à <a href="mailto:{email}">{email}</a>.',
        ),
      },
      {
        q: t('Why pay for support if everything is free?', 'Pourquoi payer du support si tout est gratuit ?'),
        a: t(
          'Because identity is the front door to all your applications. The day nobody can sign in, you want to call someone who knows the code. Support is trust: a team that answers, advises you on the right architecture, and has already done the migrations you are about to do.',
          'Parce que l’identité est la porte d’entrée de toutes vos applications. Le jour où personne n’arrive à se connecter, vous voulez quelqu’un qui connaît le code à appeler. Le support, c’est de la confiance : une équipe qui répond, qui vous conseille sur la bonne architecture, et qui a déjà fait les migrations que vous allez faire.',
        ),
      },
      {
        q: t('We have no technical team. Is it for us?', 'Je n’ai pas d’équipe technique. C’est pour moi ?'),
        a: t(
          'FerrisKey is installed and run by a technical team. If you do not have one, we can scope the project with you, set it up, and train the person who will maintain it. Write to <a href="mailto:{email}">{email}</a>.',
          'FerrisKey s’installe et s’opère par une équipe technique. Si vous n’en avez pas, nous pouvons cadrer le projet avec vous, faire la mise en place et former la personne qui le maintiendra. Écrivez à <a href="mailto:{email}">{email}</a>.',
        ),
      },
      {
        q: t('Can I try it without breaking anything?', 'Je peux l’essayer sans rien casser ?'),
        a: t(
          'Yes. One <code>docker compose up</code> runs FerrisKey locally, next to your current system. Nothing is connected to your applications until you decide it.',
          'Oui. Un <code>docker compose up</code> lance FerrisKey en local, à côté de votre système actuel. Rien n’est branché sur vos applications tant que vous ne l’avez pas décidé.',
        ),
      },
    ],
  },

  help: {
    label: t('How we help', 'Comment on vous aide'),
    audience: t('For CTOs and decision-makers.', 'Pour les CTO et les décideurs.'),
    title: t('The software is open source, all of it.', 'Le logiciel est open source, en entier.'),
    description: t('What we bring is the team that writes it.', 'Ce que nous apportons, c’est l’équipe qui l’écrit.'),
    items: [
      {
        title: t('Consulting', 'Conseil'),
        text: t(
          'Choose the right identity architecture: one realm or several, B2B organizations, which flows to use, access rules.',
          'Choisir la bonne architecture d’identité : un realm ou plusieurs, organisations B2B, flows à utiliser, règles d’accès.',
        ),
      },
      {
        title: t('Migration', 'Migration'),
        text: t(
          'Move from Keycloak, Zitadel, Supabase or home-made auth to FerrisKey, step by step, without cutting off your users.',
          'Passer de Keycloak, Zitadel, Supabase ou d’une auth maison à FerrisKey, par étapes, sans couper l’accès de vos utilisateurs.',
        ),
      },
      {
        title: t('Going to production', 'Mise en production'),
        text: t(
          'Kubernetes deployment, high availability, backups, monitoring.',
          'Déploiement Kubernetes, haute disponibilité, sauvegardes, supervision.',
        ),
      },
      {
        title: t('Support', 'Support'),
        text: t(
          'A team that answers when things get stuck, and knows the code because it wrote it.',
          'Une équipe qui répond quand ça bloque, et qui connaît le code parce qu’elle l’a écrit.',
        ),
      },
    ],
  },

  cta: {
    title: t('Ready to bring your access under one roof?', 'Prêt à centraliser vos accès ?'),
    description: t(
      'Try FerrisKey locally in a few minutes, or tell us about your project: migrating from Keycloak, SSO and MFA for your B2B customers, going to production.',
      'Essayez FerrisKey en local en quelques minutes, ou parlez-nous de votre projet : migration depuis Keycloak, SSO et double authentification pour vos clients B2B, mise en production.',
    ),
    docs: t('Start with the docs', 'Commencer avec la doc'),
    contact: t('Tell us about your project', 'Parler de votre projet'),
    github: t('View on GitHub', 'Voir sur GitHub'),
  },
}
