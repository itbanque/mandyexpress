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
        "Fourgons cargo modernes offrant jusqu'à 13,5 m³ d'espace de chargement, 3 500 kg de charge utile et un accès par portes arrière et latérale — pour un fret rapide et flexible entre Montréal et Toronto."
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
        "Demandez une soumission ou joignez l'équipe Mandy Express : appelez le 514-623-5486 ou écrivez à info@mandyexpress.ca pour une expédition le jour même entre Montréal et Toronto."
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
    ],
    routeAria: "Trajet de l'autoroute 401 entre Toronto et Montréal",
    routeMapAlt:
      "Notre seul trajet, l'autoroute 401 : service de fret dédié le jour même entre Toronto et Montréal"
  },
  footer: {
    ctaTitle: "Prêt à expédier aujourd'hui?",
    ctaLine1: "Confiez-nous votre marchandise.",
    ctaLine2: "Appelez-nous, écrivez-nous ou demandez une soumission dès aujourd'hui.",
    quickLinks: "Liens rapides",
    contactUs: "Nous joindre",
    tagline: "Plus qu'une cargaison. Votre confiance, notre priorité.",
    copyright: "© 2024 Mandy Express Freight Service. Tous droits réservés.",
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
    company: "Nom de l'entreprise",
    companyPlaceholder: "Nom de l'entreprise",
    phone: "Numéro de téléphone",
    phonePlaceholder: "(514) 123-4567",
    email: "Adresse courriel",
    emailPlaceholder: "vous@exemple.com",
    shipmentInfo: "Renseignements sur l'expédition",
    pickupLocation: "Lieu de cueillette",
    pickupLocationPlaceholder: "Adresse de cueillette",
    deliveryLocation: "Lieu de livraison",
    deliveryLocationPlaceholder: "Adresse de livraison",
    pickupDate: "Date de cueillette",
    requiredDeliveryTime: "Délai de livraison requis",
    deliveryTimePlaceholder: "Choisir le délai de livraison",
    deliveryTimeOptions: [
      "Livraison le jour même",
      "Livraison le lendemain",
      "Livraison flexible",
      "Livraison en matinée",
      "Livraison en après-midi"
    ],
    additionalDetails: "Détails supplémentaires",
    typeOfGoods: "Type de marchandises",
    goodsTypes: [
      "Vêtements",
      "Produits de détail",
      "Échantillons",
      "Cartons",
      "Marchandise palettisée",
      "Autre"
    ],
    numberOfPallets: "Nombre de palettes",
    palletsPlaceholder: "Nombre de palettes",
    approximateWeight: "Poids approximatif",
    weightPlaceholder: "Poids en lb",
    dimensions: "Dimensions",
    dimensionsPlaceholder: "L x l x H (pouces)",
    specialRequirements: "Exigences particulières",
    specialRequirementOptions: [
      "Hayon élévateur",
      "Livraison à l'intérieur",
      "Livraison résidentielle",
      "Accès limité",
      "Manutention spéciale / Fragile"
    ],
    additionalNotes: "Remarques supplémentaires",
    notesPlaceholder: "Écrivez votre message ici...",
    submit: "Envoyer la demande",
    submitting: "ENVOI...",
    secureNote: "Vos renseignements sont protégés et ne seront utilisés que pour répondre à votre demande.",
    errorFallback:
      "Nous n'avons pas pu envoyer votre demande. Écrivez à info@mandyexpress.ca ou appelez au 514-623-5486."
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
        "Nous n'avons pas pu envoyer votre message. Appelez au 514-623-5486 ou écrivez à info@mandyexpress.ca."
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
      { label: "Espace de chargement", value: "Jusqu'à 13,5 m³" },
      { label: "Charge utile", value: "Jusqu'à 3 500 kg" },
      { label: "Longueur", value: "Jusqu'à 4,2 m" },
      { label: "Hauteur", value: "Jusqu'à 1,9 m" },
      { label: "Largeur", value: "Jusqu'à 1,7 m" },
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
    mapSvgAria: "Trajet de l'autoroute 401 entre Toronto et Montréal",
    lakeLabel: "LAC ONTARIO",
    cities: ["Toronto", "Oshawa", "Belleville", "Kingston", "Cornwall", "Montréal"],
    highlightsAria: "Points forts du service",
    highlights: [
      {
        title: "Service quotidien",
        lines: ["De Montréal à Toronto", "Chaque jour ouvrable"]
      },
      {
        title: "Livraison le jour même",
        lines: ["Livraison rapide, fiable", "et à temps"]
      },
      {
        title: "Porte-à-porte",
        lines: ["Cueillette et livraison directes", "Aucun transfert en terminal"]
      },
      {
        title: "Fourgon cargo dédié",
        lines: ["Une expédition.", "Un véhicule. Un chauffeur."]
      }
    ],
    detailsHeading: "Détails du trajet",
    details: [
      {
        title: "Distance",
        lines: ["Environ 545 km"]
      },
      {
        title: "Temps de route",
        lines: ["Environ 5,5 à 6,5 heures"]
      },
      {
        title: "Arrêts principaux",
        lines: ["Cornwall, Kingston,", "Belleville, Oshawa"]
      },
      {
        title: "Fréquence",
        lines: ["Tous les jours (lun - ven)", "Service le samedi sur demande"]
      },
      {
        title: "Capacité",
        lines: ["Fourgon cargo dédié", "Jusqu'à 3 500 kg"]
      }
    ]
  },
  aboutPage: {
    heroAria: "À propos de Mandy Express",
    heroImageAlt: "Fourgon cargo Sprinter de Mandy Express sur le corridor de l'autoroute 401 à Toronto",
    eyebrow: "À propos de Mandy Express",
    heroTitleLines: ["Plus qu'une cargaison.", "Votre confiance, notre priorité."],
    heroParagraphs: [
      "Mandy Express Freight Service est une entreprise canadienne spécialisée dans le transport quotidien de marchandises le long du corridor Montréal-Toronto.",
      "Nous nous engageons à livrer votre marchandise en toute sécurité, à temps, chaque fois. Vos affaires continuent d'avancer, et nous y veillons."
    ],
    highlightsAria: "Points forts de l'entreprise Mandy Express",
    highlights: [
      {
        title: "Service quotidien",
        lines: ["De Montréal à Toronto", "Chaque jour ouvrable"]
      },
      {
        title: "100 %",
        lines: ["Livraison à temps", "Notre engagement"]
      },
      {
        title: "Corridor 401",
        lines: ["Un trajet spécialisé", "Notre expertise"]
      },
      {
        title: "Entreprise canadienne",
        lines: ["Entreprise locale.", "Service personnalisé."]
      }
    ],
    storyEyebrow: "Notre histoire",
    storyTitleLines: ["BÂTIE SUR LA FIABILITÉ.", "PORTÉE PAR L'ENGAGEMENT."],
    storyParagraphs: [
      "Mandy Express a été fondée avec une mission simple : offrir un service de fret rapide, fiable et sans tracas entre Montréal et Toronto.",
      "Forts de plusieurs années d'expérience en logistique, nous comprenons ce dont les entreprises ont besoin : un service constant, une communication claire et un partenaire sur qui compter.",
      "Nous ne faisons pas que transporter des marchandises. Nous livrons la tranquillité d'esprit."
    ],
    valuesHeading: "Nos valeurs",
    values: [
      {
        title: "Fiabilité",
        lines: ["Nous tenons parole.", "Chaque livraison, chaque fois."]
      },
      {
        title: "Ponctualité",
        lines: ["Le temps est critique.", "Nous respectons toujours l'horaire."]
      },
      {
        title: "Partenariat",
        lines: ["Nous agissons comme le", "prolongement de votre entreprise."]
      },
      {
        title: "Soin",
        lines: ["Votre marchandise est traitée", "avec soin et respect."]
      }
    ],
    ctaAria: "Avançons ensemble",
    ctaTitle: "Avançons ensemble",
    ctaText: "Communiquez avec nous dès aujourd'hui pour un service de fret fiable, digne de votre confiance."
  }
};
