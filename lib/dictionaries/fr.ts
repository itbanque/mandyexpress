import type { Dictionary } from "./en";

export const fr: Dictionary = {
  langSwitcher: {
    short: "EN",
    full: "English",
    ariaLabel: "Switch to English"
  },
  nav: {
    home: "Accueil",
    services: "Services",
    fleet: "Flotte",
    route: "Trajet",
    about: "À propos",
    contact: "Contact"
  },
  header: {
    homeAria: "Accueil Mandy Express",
    primaryNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu"
  },
  common: {
    getAQuote: "Obtenir une soumission"
  },
  cookieConsent: {
    ariaLabel: "Consentement aux témoins",
    message:
      "Nous utilisons des témoins (cookies) pour améliorer votre expérience de navigation et mémoriser vos préférences. En cliquant sur « Accepter », vous consentez à leur utilisation.",
    accept: "Accepter",
    decline: "Refuser"
  },
  meta: {
    root: {
      title: "Mandy Express | Livraison de fret le jour même",
      description:
        "Livraison de fret le jour même entre Toronto et Montréal par l'autoroute 401. Service quotidien de porte-à-porte en fourgon cargo, chaque jour ouvrable.",
      ogImageAlt: "Fourgon cargo Mandy Express sur l'autoroute 401 entre Montréal et Toronto"
    },
    services: {
      title: "Nos services",
      description:
        "Service de fret quotidien entre Montréal et Toronto par l'autoroute 401 : livraison le jour même, cueillette et livraison porte-à-porte, et manutention soignée chaque jour ouvrable."
    },
    fleet: {
      title: "Notre flotte",
      description:
        "Fourgons cargo modernes offrant jusqu'à 477 pi³ d'espace de chargement, 3 500 lb de charge utile et un accès par portes arrière et latérale — pour un fret rapide et flexible entre Montréal et Toronto."
    },
    route: {
      title: "Notre trajet",
      description:
        "Le corridor de l'autoroute 401 entre Montréal et Toronto : départs chaque jour ouvrable, livraison le jour même et service porte-à-porte direct, sans transfert en terminal."
    },
    about: {
      title: "À propos",
      description:
        "Mandy Express est un transporteur canadien spécialisé dans le corridor Montréal–Toronto de l'autoroute 401, engagé envers la livraison à temps et un service personnalisé."
    },
    contact: {
      title: "Nous joindre",
      description:
        "Demandez une soumission ou joignez l'équipe Mandy Express : appelez le 438-921-7268 ou écrivez à info@mandyexpress.ca pour une expédition le jour même entre Montréal et Toronto."
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Comment Mandy Express recueille, utilise et protège les renseignements personnels de ses clients, chauffeurs et visiteurs, conformément à la LPRPDE et à la Loi 25 du Québec."
    },
    terms: {
      title: "Conditions générales",
      description:
        "Les conditions du service de fret le jour même de Mandy Express : limites de chargement, marchandises interdites, tarifs et paiement, preuve de livraison, réclamations et limites de responsabilité."
    }
  },
  home: {
    heroAria: "Livraison de fret le jour même Mandy Express",
    heroAlt:
      "Livraison de fret le jour même Mandy Express de Toronto à Montréal par l'autoroute 401 avec un Mercedes-Benz Sprinter 2025 à toit surélevé allongé",
    services: [
      {
        title: "Livraison le jour même",
        lines: ["Cueillette le matin.", "Livraison le jour même."]
      },
      {
        title: "Service quotidien dédié",
        lines: ["Toronto ↔ Montréal", "Chaque jour ouvrable."]
      },
      {
        title: "Porte-à-porte",
        lines: ["Aucun transfert en terminal.", "Directement à votre porte."]
      },
      {
        title: "Spécialistes du corridor 401",
        lines: ["Un seul trajet.", "Une seule priorité."]
      }
    ]
  },
  footer: {
    quickLinks: "Liens rapides",
    contactUs: "Nous joindre",
    tagline: "Plus qu'une cargaison. Votre confiance, notre priorité.",
    copyright: "© {year} Mandy Express Freight Service. Tous droits réservés.",
    privacy: "Politique de confidentialité",
    terms: "Conditions générales"
  },
  quote: {
    title: "Demande de soumission",
    subtitle: "Rapide. Fiable. Livraison le jour même. Toronto ↔ Montréal par l'autoroute 401",
    closeAria: "Fermer le formulaire de soumission",
    successTitle: "Demande envoyée",
    successBody: "Merci. Votre demande de soumission a été envoyée à info@mandyexpress.ca.",
    close: "Fermer",
    contactInfo: "Coordonnées",
    fullName: "Nom complet",
    fullNamePlaceholder: "Votre nom",
    phone: "Numéro de téléphone",
    phonePlaceholder: "(514) 123-4567",
    email: "Adresse courriel",
    emailPlaceholder: "vous@exemple.com",
    contactHint: "* Téléphone ou courriel — veuillez en remplir au moins un pour que nous puissions vous joindre.",
    contactRequired: "Veuillez fournir un numéro de téléphone ou une adresse courriel.",
    shipmentInfo: "Renseignements sur l'expédition",
    pickupLocation: "Lieu de cueillette",
    pickupLocationPlaceholder: "Choisir la ville",
    deliveryLocation: "Lieu de livraison",
    deliveryLocationPlaceholder: "Choisir la ville",
    locationOptions: ["Toronto", "Montréal"],
    pickupDate: "Date de service",
    requiredDeliveryTime: "Délai de livraison requis",
    deliveryTimePlaceholder: "Choisir le délai",
    deliveryTimeOptions: [
      "Livraison le jour même",
      "Livraison le lendemain",
      "Livraison flexible",
      "Livraison en matinée",
      "Livraison en après-midi"
    ],
    additionalDetails: "Détails supplémentaires",
    restrictionsHeading: "Sécurité de la flotte et marchandises refusées",
    restrictionsIntro:
      "Afin de garantir une conformité réglementaire absolue, l'hygiène du transport et le respect du cadre légal interprovincial, les interdictions suivantes sont strictement appliquées :",
    restrictions: [
      {
        title: "Aucune marchandise à température contrôlée",
        text: "Afin de protéger la rigueur de nos horaires de transport express et l'affectation normale de nos véhicules, nous n'acceptons aucun produit surgelé, réfrigéré ou tempéré."
      },
      {
        title: "Aucune matière dangereuse (Hazmat)",
        text: "Les préparations chimiques inflammables, les matières explosives, les blocs de piles au lithium et les composés industriels volatils sont strictement interdits afin d'assurer la protection de la marchandise."
      },
      {
        title: "Aucun animal vivant ni produit sanitaire interdit",
        text: "Le bétail, les animaux de compagnie, les matières biologiques organiques et les produits agricoles légalement restreints sont entièrement refusés afin de garantir des espaces de chargement parfaitement salubres."
      }
    ],
    palletSizeNote: "1 palette : 48 × 40 × 63 (L × l × H) pouces",
    numberOfPallets: "Nombre de palettes",
    palletsPlaceholder: "Quantité",
    approximateWeight: "Poids approximatif",
    weightPlaceholder: "Poids en lb",
    additionalNotes: "Remarques supplémentaires",
    notesPlaceholder: "Écrivez votre message ici...",
    submit: "Envoyer la demande",
    submitting: "ENVOI...",
    secureNote: "Vos renseignements sont protégés et ne seront utilisés que pour répondre à votre demande.",
    errorFallback:
      "Nous n'avons pas pu envoyer votre demande. Écrivez à info@mandyexpress.ca ou appelez au 438-921-7268."
  },
  contactPage: {
    heroAria: "Joindre Mandy Express",
    heroTitle: "Nous joindre",
    heroSubtitle: "Nous sommes là pour vous aider. Communiquez avec notre équipe.",
    mainAria: "Coordonnées et formulaire de message",
    infoHeading: "Coordonnées",
    phone: "Téléphone",
    email: "Courriel",
    website: "Site Web",
    office: "Bureau",
    officeLines: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"],
    hours: "Heures d'ouverture",
    hoursLines: ["Lun – ven : 8 h à 18 h", "Sam – dim : sur rendez-vous"],
    formHeading: "Écrivez-nous"
  },
  contactForm: {
    nameLabel: "Votre nom",
    emailLabel: "Adresse courriel",
    phoneLabel: "Numéro de téléphone",
    serviceLabel: "Type de service",
    servicePlaceholder: "Type de service",
    serviceTypes: [
      "Livraison le jour même",
      "Service de fret quotidien",
      "Service porte-à-porte",
      "Fourgon cargo dédié",
      "Service de déménagement",
      "Autre"
    ],
    messageLabel: "Votre message",
    errors: {
      name: "Veuillez entrer votre nom.",
      emailRequired: "Veuillez entrer votre adresse courriel.",
      emailInvalid: "Veuillez entrer une adresse courriel valide.",
      message: "Veuillez entrer votre message.",
      fallback:
        "Nous n'avons pas pu envoyer votre message. Appelez au 438-921-7268 ou écrivez à info@mandyexpress.ca."
    },
    successTitle: "Message envoyé",
    successBody: "Merci. Nous avons bien reçu votre message et vous répondrons dès que possible.",
    sendAnother: "Envoyer un autre message",
    submit: "Envoyer le message",
    submitting: "Envoi..."
  },
  servicesPage: {
    heroAria: "Solutions de fret Mandy Express",
    heroImageAlt:
      "Fourgon cargo Mercedes-Benz Sprinter 2025 à toit surélevé allongé avec le logo et le slogan Mandy Express sur l'autoroute 401 près de Toronto",
    eyebrow: "Nos services",
    heroTitleLines: ["Des solutions de fret", "sur lesquelles compter"],
    heroText:
      "Nous offrons un transport de marchandises rapide, fiable et sécuritaire le long du corridor Montréal-Toronto.",
    whatWeOffer: "Ce que nous offrons",
    offers: [
      {
        title: "Service de fret quotidien",
        text: "Service quotidien entre Montréal et Toronto par l'autoroute 401. Chaque jour ouvrable."
      },
      {
        title: "Livraison le jour même",
        text: "Vos envois urgents livrés le jour même. Rapide, efficace et fiable."
      },
      {
        title: "Service porte-à-porte",
        text: "Cueillette et livraison directes à votre porte. Aucun transfert en terminal."
      },
      {
        title: "Fourgon cargo dédié",
        text: "Une expédition. Un véhicule. Un chauffeur. Sécurité et contrôle maximaux."
      }
    ],
    whyChoose: "Pourquoi choisir Mandy Express?",
    reasons: [
      {
        title: "Fiable et sécuritaire",
        text: "Des véhicules bien entretenus et des chauffeurs professionnels dignes de confiance."
      },
      {
        title: "Livraison à temps",
        text: "Votre temps est précieux : nous livrons comme promis."
      },
      {
        title: "Experts du corridor 401",
        text: "Spécialisés dans le corridor de fret Montréal-Toronto."
      },
      {
        title: "Soutien dévoué",
        text: "Une équipe attentionnée pour tous vos besoins d'expédition."
      }
    ],
    howItWorks: "Comment ça fonctionne",
    steps: [
      {
        title: "Demandez une soumission",
        text: "Communiquez avec nous avec les détails de votre expédition."
      },
      {
        title: "Cueillette",
        text: "Nous ramassons votre marchandise à votre adresse."
      },
      {
        title: "En route",
        text: "Votre marchandise est en route par l'autoroute 401."
      },
      {
        title: "Livré",
        text: "Livrée à destination, en toute sécurité et à temps."
      }
    ]
  },
  fleetPage: {
    heroAria: "Flotte Mandy Express",
    eyebrow: "Notre flotte",
    heroTitleLines: ["Conçue pour la vitesse.", "Conçue pour la fiabilité."],
    heroText:
      "Notre flotte moderne de fourgons cargo est conçue pour livrer votre marchandise en toute sécurité, rapidement et à temps le long du corridor Montréal-Toronto.",
    heroImageAlt: "Mercedes-Benz Sprinter 2025 à toit surélevé allongé de Mandy Express sur l'autoroute 401 près de Toronto",
    cargoVanHeading: "Notre fourgon cargo",
    vanImageAlt: "Fourgon cargo Mercedes-Benz Sprinter 2025 à toit surélevé allongé de Mandy Express",
    vanName: "Fourgon cargo Sprinter",
    vanText: "Spacieux, propre et équipé pour manipuler votre marchandise avec soin. Idéal pour les envois urgents.",
    specs: [
      { label: "Espace de chargement", value: "Jusqu'à 477 pi³" },
      { label: "Charge utile", value: "Jusqu'à 3 500 lb" },
      { label: "Longueur", value: "Jusqu'à 165 po" },
      { label: "Hauteur", value: "Jusqu'à 75 po" },
      { label: "Largeur", value: "Jusqu'à 67 po" },
      { label: "Accès", value: "Portes arrière et latérale" }
    ],
    advantagesHeading: "Avantages de la flotte",
    advantages: [
      {
        title: "Fiable et sécuritaire",
        text: "Une flotte bien entretenue pour la sécurité de votre cargaison."
      },
      {
        title: "Livraison à temps",
        text: "Conçue pour la vitesse et l'efficacité sur l'autoroute 401."
      },
      {
        title: "Service dédié",
        text: "Une expédition. Un véhicule. Un chauffeur."
      },
      {
        title: "Manutention sécuritaire",
        text: "Votre marchandise est traitée avec soin, de la cueillette à la livraison."
      }
    ],
    ctaAria: "Besoin d'un service de fret",
    ctaTitle: "Besoin d'un service de fret?",
    ctaText: "Communiquez avec nous dès aujourd'hui pour une soumission rapide et précise."
  },
  routePage: {
    heroAria: "Trajet de l'autoroute 401 de Mandy Express",
    toronto: "Toronto",
    montreal: "Montréal",
    heroSubtitle: "Service de fret quotidien par l'autoroute 401",
    corridorHeading: "Le corridor de la 401",
    mapAria: "Carte du trajet entre Toronto et Montréal par l'autoroute 401",
    coverageNote:
      "Nous desservons toutes les villes situées le long du corridor entre Montréal et Toronto.",
    coverageSoon: "D'autres villes à venir."
  },
  aboutPage: {
    heroAria: "À propos de Mandy Express",
    heroImageAlt: "Fourgon cargo Sprinter de Mandy Express sur le corridor de l'autoroute 401 au crépuscule",
    eyebrow: "Toronto (TRT) ↔ Montréal (MTL)",
    heroTitleLines: ["Efficace. Sécuritaire.", "Direct."],
    heroAccent: "Le jour même.",
    heroLead:
      "Nous sommes un service de transport de fret moderne dédié aux livraisons le jour même entre Toronto (TRT) et Montréal (MTL) — un modèle B2B direct, de point à point, sans aucun centre de transit.",
    fleetCta: "Voir notre flotte",
    stats: [
      { value: "Le jour même", label: "Livraisons entre Toronto et Montréal" },
      { value: "B2B direct", label: "De point à point, sans centre de transit" },
      { value: "AZ", label: "Chauffeurs licenciés sur chaque trajet" },
      { value: "15 min / 2 h", label: "Pause obligatoire, rigoureusement appliquée" }
    ],
    missionEyebrow: "Notre mission",
    missionTitleLines: ["Efficacité, gain de temps,", "et qualité supérieure."],
    missionParagraphs: [
      "Nous plaçons toujours la confiance de nos clients et la sécurité de leur marchandise au premier plan.",
      "Grâce à un modèle B2B direct, nous éliminons la manutention inutile et les intermédiaires, pour un véritable service de point à point."
    ],
    missionQuote: "Ramassage rapide. Livraison directe.",
    guaranteesEyebrow: "Ce que vous obtenez, chaque fois",
    guaranteesHeading: "Nos 4 garanties fondamentales",
    guaranteesLead: "Quatre engagements derrière chaque envoi que nous transportons sur le corridor 401.",
    fleetImageAlt: "Espace de chargement d'un fourgon Sprinter 2500 à toit haut allongé de Mandy Express",
    guarantees: [
      {
        title: "Direct et efficace",
        text: "Fini les centres de transit et les transferts complexes. Notre livraison directe de point à point réduit considérablement les délais de transport."
      },
      {
        title: "Parc haut de gamme",
        text: "Notre parc est entièrement composé de fourgons Benz Sprinter 2500 à toit haut allongé — performance, fiabilité et grand volume de chargement pour protéger votre marchandise."
      },
      {
        title: "Chauffeurs classe AZ",
        text: "Chaque chauffeur de notre équipe détient un permis de camion AZ valide, avec une grande maîtrise de la conduite et une longue expérience routière."
      },
      {
        title: "Normes de sécurité strictes",
        text: "Nous imposons une pause obligatoire de 15 minutes toutes les 2 heures de conduite. Un chauffeur reposé est la meilleure garantie pour votre marchandise."
      }
    ],
    compareEyebrow: "La différence",
    compareHeading: "Pourquoi le direct l'emporte",
    compareOldTitle: "Réseau à centres de transit",
    compareOldSteps: [
      "Ramassage, puis attente du prochain départ",
      "Centre de tri, première manutention",
      "Transfert d'une remorque à l'autre",
      "Deuxième terminal, deuxième manutention",
      "Livraison selon l'horaire du réseau"
    ],
    compareNewTitle: "Mandy Express, de point à point",
    compareNewSteps: [
      "Ramassage rapide à votre porte",
      "Un fourgon, un chauffeur, direct sur la 401",
      "Livraison directe le jour ouvrable même"
    ],
    compareNote: "Une seule équipe responsable, du ramassage à la signature.",
    ctaAria: "Devenir partenaire de Mandy Express",
    ctaTitle: "Confiez-nous votre fret",
    ctaText: "Concentrez-vous sur vos affaires. Nous avons hâte de bâtir un partenariat solide et durable avec vous."
  },
  privacyPage: {
    heroAria: "Politique de confidentialité de Mandy Express",
    eyebrow: "Mentions légales",
    title: "Politique de confidentialité",
    intro: [
      "Mandy Express est le nom commercial de 17677995 Canada Inc. (« Mandy Express », « nous » ou « notre »). Nous nous engageons à protéger la confidentialité, l'exactitude et la sécurité des renseignements personnels recueillis auprès de nos clients, de nos chauffeurs, des visiteurs de notre site Web et de nos partenaires d'affaires à Toronto, à Montréal et dans les régions environnantes.",
      "La présente politique explique comment nous recueillons, utilisons, communiquons et protégeons vos renseignements lorsque vous visitez notre site Web, demandez une soumission de transport le jour même ou faites appel à nos services de transport et de logistique."
    ],
    effectiveLabel: "Date d'entrée en vigueur",
    effectiveDate: "28 juillet 2026",
    updatedLabel: "Dernière mise à jour",
    updatedDate: "28 juillet 2026",
    tocHeading: "Sur cette page",
    tocAria: "Sections de la politique de confidentialité",
    sections: [
      {
        title: "1. Portée et conformité",
        body: [
          "La présente politique s'applique à tous les renseignements personnels recueillis par Mandy Express par l'entremise de notre site Web, de nos communications mobiles, de notre portail client ou directement lors d'une transaction d'expédition. Nous respectons les lois canadiennes fédérales et provinciales en matière de protection des renseignements personnels, notamment :"
        ],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "LPRPDE :",
                text: "la Loi sur la protection des renseignements personnels et les documents électroniques."
              },
              {
                term: "Loi 25 du Québec :",
                text: "la Loi sur la protection des renseignements personnels dans le secteur privé."
              }
            ]
          }
        ]
      },
      {
        title: "2. Renseignements que nous recueillons",
        body: [
          "Nous recueillons uniquement les renseignements nécessaires pour offrir un service de transport express le jour même efficace et pour assurer nos activités commerciales."
        ],
        groups: [
          {
            heading: "Renseignements que vous nous fournissez",
            items: [
              {
                term: "Coordonnées et détails d'expédition :",
                text: "nom, nom de l'entreprise, adresses de ramassage et de livraison, numéro de téléphone et adresse courriel."
              },
              {
                term: "Renseignements sur l'envoi et la logistique :",
                text: "contenu des colis, poids et dimensions, instructions de livraison, nom et numéro de téléphone du destinataire ainsi que les signatures (preuve de livraison)."
              },
              {
                term: "Renseignements de compte et financiers :",
                text: "adresses de facturation, données de carte de paiement et personnes-ressources pour la facturation."
              },
              {
                term: "Demandes au service à la clientèle :",
                text: "renseignements fournis lors d'une demande de soumission, du suivi d'un envoi ou d'un échange avec notre équipe de soutien."
              }
            ]
          },
          {
            heading: "Renseignements recueillis automatiquement",
            items: [
              {
                term: "Données d'utilisation du site :",
                text: "adresse IP, type de navigateur, système d'exploitation, URL de référence, pages consultées et temps passé sur le site."
              },
              {
                term: "Témoins et suivi :",
                text: "témoins de session et d'analyse standards utilisés pour optimiser la performance du site et votre expérience de navigation."
              }
            ]
          }
        ]
      },
      {
        title: "3. Utilisation de vos renseignements",
        body: [
          "Mandy Express utilise les renseignements recueillis uniquement à des fins commerciales et de transport légitimes, notamment :"
        ],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Exécution du service :",
                text: "planification, répartition de nos fourgons Sprinter, livraison des colis et obtention de la preuve de livraison."
              },
              {
                term: "Communication :",
                text: "mises à jour sur les envois, suivi, soumissions et soutien à la clientèle."
              },
              {
                term: "Facturation et administration :",
                text: "traitement des paiements, gestion des comptes et émission des factures."
              },
              {
                term: "Optimisation du service :",
                text: "analyse de la performance des livraisons et amélioration du fonctionnement de notre site Web."
              },
              {
                term: "Obligations légales et sécurité :",
                text: "respect des règlements provinciaux et fédéraux en matière de transport, de douanes et de sécurité."
              }
            ]
          }
        ]
      },
      {
        title: "4. Communication et partage des renseignements",
        body: [
          "Nous ne vendons, ne louons et n'échangeons jamais vos renseignements personnels. Nous les communiquons uniquement dans des circonstances limitées :"
        ],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Fournisseurs et partenaires logistiques :",
                text: "des tiers de confiance, comme les processeurs de paiement et les fournisseurs de logiciels de répartition, qui agissent strictement pour notre compte et sous entente de confidentialité."
              },
              {
                term: "Destinataires :",
                text: "les renseignements de livraison nécessaires au destinataire désigné d'un envoi, comme les avis d'arrivée du chauffeur ou les demandes de signature de la preuve de livraison."
              },
              {
                term: "Obligations légales et réglementaires :",
                text: "lorsque la loi, une assignation ou une autorité gouvernementale l'exige, ou pour protéger la sécurité, les droits et les biens de Mandy Express, de nos chauffeurs ou du public."
              }
            ]
          }
        ]
      },
      {
        title: "5. Sécurité et protection des données",
        body: [
          "Nous mettons en place des mesures de protection physiques, techniques et administratives commercialement raisonnables afin de protéger vos renseignements personnels contre la perte, le vol, l'accès non autorisé, la communication ou la modification."
        ],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Transmission des données :",
                text: "chiffrement SSL/TLS des renseignements transmis par l'entremise de notre site Web."
              },
              {
                term: "Contrôle des accès :",
                text: "l'accès aux renseignements personnels est réservé aux employés et au personnel de répartition autorisés qui en ont besoin dans l'exercice de leurs fonctions."
              }
            ]
          }
        ]
      },
      {
        title: "6. Conservation des données",
        body: [
          "Nous conservons les renseignements personnels seulement le temps nécessaire à la réalisation des fins pour lesquelles ils ont été recueillis, ou pour respecter les exigences légales, comptables et réglementaires applicables, comme la tenue des registres fiscaux et des manifestes de fret.",
          "Lorsque les renseignements ne sont plus nécessaires, ils sont détruits de façon sécuritaire ou anonymisés."
        ],
        groups: []
      },
      {
        title: "7. Vos droits et vos choix",
        body: [
          "Selon votre lieu de résidence, y compris l'Ontario et le Québec, vous avez le droit de :"
        ],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Accès et rectification :",
                text: "demander l'accès aux renseignements personnels que nous détenons à votre sujet ou leur rectification."
              },
              {
                term: "Retrait du consentement :",
                text: "retirer en tout temps votre consentement au traitement de vos renseignements, sous réserve des contraintes légales ou contractuelles."
              },
              {
                term: "Droits des résidents du Québec :",
                text: "les résidents du Québec peuvent demander des renseignements sur le traitement automatisé de leurs données ou exercer les droits particuliers prévus par la Loi 25."
              }
            ]
          }
        ]
      },
      {
        title: "8. Liens vers des sites tiers",
        body: [
          "Notre site Web peut contenir des liens vers des sites externes, comme des services cartographiques ou des réseaux sociaux. Mandy Express n'est pas responsable des pratiques de confidentialité ni du contenu de ces plateformes; nous vous invitons à consulter leurs politiques respectives."
        ],
        groups: []
      },
      {
        title: "9. Mises à jour de la politique",
        body: [
          "Mandy Express se réserve le droit de modifier ou de mettre à jour la présente politique en tout temps. Toute modification est publiée directement sur cette page, accompagnée d'une nouvelle date de « dernière mise à jour »."
        ],
        groups: []
      }
    ],
    contact: {
      title: "10. Coordonnées et responsable de la protection des renseignements personnels",
      body: "Pour toute question, préoccupation ou demande concernant la présente politique ou le traitement de vos renseignements personnels, veuillez communiquer avec notre responsable de la protection des renseignements personnels :",
      office: "Bureau de la confidentialité de Mandy Express",
      legalName: "17677995 Canada Inc., faisant affaire sous le nom de Mandy Express",
      emailLabel: "Courriel",
      email: "info@mandyexpress.ca",
      phoneLabel: "Téléphone",
      phone: "438-921-7268",
      areasLabel: "Zones desservies",
      areas: "Grande région de Toronto (GTA) et Grand Montréal",
      addressLabel: "Adresse",
      addressLines: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"]
    }
  },
  termsPage: {
    heroAria: "Conditions générales de service de Mandy Express",
    eyebrow: "Mentions légales",
    title: "Conditions générales de service",
    intro: [
      "Veuillez lire attentivement les présentes conditions générales (les « conditions ») avant d'utiliser nos services ou notre site Web, ou de réserver un transport auprès de 17677995 Canada Inc., faisant affaire sous le nom de Mandy Express (« Mandy Express », l'« entreprise », « nous » ou « notre »).",
      "En réservant un envoi, en accédant à notre site Web ou en utilisant nos services de transport le jour même, vous (le « client », l'« expéditeur » ou le « destinataire ») acceptez d'être lié par les présentes conditions."
    ],
    effectiveLabel: "Date d'entrée en vigueur",
    effectiveDate: "28 juillet 2026",
    updatedLabel: "Dernière mise à jour",
    updatedDate: "28 juillet 2026",
    tocHeading: "Sur cette page",
    tocAria: "Sections des conditions générales",
    sections: [
      {
        title: "1. Portée des services",
        body: [
          "Mandy Express offre des services de fret express le jour même, de messagerie et de transport direct de porte à porte au moyen de véhicules commerciaux légers dédiés — principalement des fourgons Sprinter — dans la grande région de Toronto (GTA), le Grand Montréal et le corridor de l'autoroute 401 qui les relie."
        ],
        groups: []
      },
      {
        title: "2. Limites et spécifications du chargement",
        body: ["Chaque envoi doit respecter la capacité de notre parc de fourgons Sprinter."],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Limites de poids et de volume :",
                text: "toute marchandise doit respecter la charge utile légale et les dimensions physiques de nos fourgons Sprinter, soit habituellement une charge utile maximale d'environ 3 000 lb (1 360 kg), selon les spécifications du véhicule."
              },
              {
                term: "Responsabilité du client :",
                text: "l'expéditeur doit fournir des dimensions, des poids et une description exacts de la marchandise au moment de la réservation. Si l'envoi dépasse la capacité réservée, des frais supplémentaires peuvent s'appliquer ou le service peut être annulé."
              }
            ]
          }
        ]
      },
      {
        title: "3. Marchandises interdites et dangereuses",
        body: ["Les restrictions suivantes s'appliquent à tout envoi confié à Mandy Express :"],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Matières dangereuses :",
                text: "sauf autorisation écrite préalable de notre part, Mandy Express ne transporte pas de matières dangereuses, de marchandises visées par la réglementation sur le transport des marchandises dangereuses (TMD), d'explosifs ni de substances radioactives."
              },
              {
                term: "Articles interdits :",
                text: "les armes à feu, les substances illégales, la contrebande, les animaux vivants, les liquides non scellés et les effets personnels de très grande valeur — argent comptant, lingots ou bijoux de valeur — sont strictement interdits."
              },
              {
                term: "Droit d'inspection :",
                text: "Mandy Express se réserve le droit d'inspecter tout colis ou toute marchandise confiés au transport afin d'en vérifier la conformité et la sécurité."
              }
            ]
          }
        ]
      },
      {
        title: "4. Soumissions, tarifs et modalités de paiement",
        body: ["Une soumission est préparée pour chaque envoi et confirmée avant le ramassage."],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Tarifs :",
                text: "les soumissions sont établies en fonction de la distance, du degré d'urgence du ramassage et de la livraison, du poids, du volume et du temps d'attente requis."
              },
              {
                term: "Frais supplémentaires :",
                text: "des frais peuvent s'appliquer pour les temps d'attente du chauffeur au-delà de la période de grâce standard de 15 minutes au ramassage ou à la livraison, pour une réexpédition, pour une tentative de livraison infructueuse causée par des renseignements erronés ou pour l'utilisation d'un hayon élévateur."
              },
              {
                term: "Modalités de paiement :",
                text: "le paiement est exigible à la réception de la facture ou au moment de la réservation, sauf si des modalités de crédit ont été approuvées par écrit. Les comptes en souffrance portent intérêt à 1,5 % par mois (18 % par année)."
              }
            ]
          }
        ]
      },
      {
        title: "5. Preuve de livraison et service le jour même",
        body: [
          "Mandy Express confirme chaque envoi livré et met tout en œuvre pour respecter la fenêtre de livraison convenue à la réservation."
        ],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Preuve de livraison :",
                text: "la livraison est considérée comme terminée dès l'obtention d'une signature physique ou électronique, d'une preuve photo ou d'une confirmation de la répartition à l'adresse du destinataire désigné."
              },
              {
                term: "Engagements de service :",
                text: "bien que nous fassions tous les efforts raisonnables pour livrer le jour même dans les délais estimés, la performance peut être touchée par des conditions météorologiques extrêmes, la congestion routière, des fermetures de routes ou des cas de force majeure. Les heures d'arrivée estimées ne sont pas garanties, sauf entente contractuelle explicite."
              }
            ]
          }
        ]
      },
      {
        title: "6. Réclamations et limitation de responsabilité",
        body: ["Les limites suivantes s'appliquent à toute marchandise transportée par Mandy Express :"],
        groups: [
          {
            heading: "",
            items: [
              {
                term: "Limite de responsabilité standard :",
                text: "sauf si une valeur déclarée plus élevée a été déclarée et payée avant le ramassage, notre responsabilité maximale pour la perte, le dommage ou le retard d'une marchandise est limitée à 2,00 $ CA la livre (4,41 $ CA le kilogramme), calculée sur le poids de l'article touché, ou à 100,00 $ CA par envoi, selon le montant le moins élevé."
              },
              {
                term: "Avis de réclamation :",
                text: "toute réclamation pour perte, dommage ou manquant doit être transmise par écrit à Mandy Express dans les 48 heures suivant la livraison ou, en cas de perte, suivant la date de livraison prévue."
              },
              {
                term: "Dommages indirects :",
                text: "Mandy Express n'est pas responsable des dommages indirects, accessoires, particuliers ou consécutifs, y compris la perte de revenus, de profits, d'intérêts ou d'occasions d'affaires."
              }
            ]
          }
        ]
      },
      {
        title: "7. Force majeure",
        body: [
          "Mandy Express ne peut être tenue responsable d'un défaut d'exécution ou d'un retard causé par des circonstances indépendantes de sa volonté raisonnable, notamment des conditions météorologiques extrêmes, des catastrophes naturelles, des fermetures d'autoroute, des grèves, des troubles civils ou des actes des autorités gouvernementales."
        ],
        groups: []
      },
      {
        title: "8. Droit applicable et compétence",
        body: [
          "Les présentes conditions sont régies et interprétées conformément aux lois de la province d'Ontario et de la province de Québec, selon la juridiction d'origine du service, ainsi qu'aux lois fédérales du Canada qui s'y appliquent."
        ],
        groups: []
      }
    ],
    contact: {
      title: "9. Questions sur les présentes conditions",
      body: "Pour toute question sur les présentes conditions, ou sur un envoi, une réservation ou une facture en particulier, communiquez avec notre équipe :",
      office: "Mandy Express Freight Service",
      legalName: "17677995 Canada Inc., faisant affaire sous le nom de Mandy Express",
      emailLabel: "Courriel",
      email: "info@mandyexpress.ca",
      phoneLabel: "Téléphone",
      phone: "438-921-7268",
      areasLabel: "Zones desservies",
      areas: "Grande région de Toronto (GTA) et Grand Montréal",
      addressLabel: "Adresse",
      addressLines: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"]
    }
  }
};
