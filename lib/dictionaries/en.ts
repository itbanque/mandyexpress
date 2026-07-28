// The legal sections are typed instead of inferred: sections without a list would
// otherwise widen their empty `groups` to never[] and break the French dictionary.
type LegalSection = {
  title: string;
  body: string[];
  groups: { heading: string; items: { term: string; text: string }[] }[];
};

const privacySections: LegalSection[] = [
  {
    title: "1. Scope and Compliance",
    body: [
      "This Policy applies to all personal information collected by Mandy Express through our website, mobile communications, customer portal, or directly during shipping transactions. We comply with Canadian federal and provincial privacy legislation, including:"
    ],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "PIPEDA:",
            text: "the Personal Information Protection and Electronic Documents Act."
          },
          {
            term: "Quebec Bill 25:",
            text: "the Act Respecting the Protection of Personal Information in the Private Sector."
          }
        ]
      }
    ]
  },
  {
    title: "2. Information We Collect",
    body: [
      "We collect only the information necessary to provide efficient same-day express transport services and to maintain our business operations."
    ],
    groups: [
      {
        heading: "Information You Provide Directly",
        items: [
          {
            term: "Contact and shipping details:",
            text: "name, company name, pick-up and delivery addresses, phone number, and email address."
          },
          {
            term: "Shipment and logistics information:",
            text: "package contents, weight and dimensions, delivery instructions, recipient name and phone number, and signatures (Proof of Delivery)."
          },
          {
            term: "Account and financial information:",
            text: "billing addresses, payment card details, and invoicing contacts."
          },
          {
            term: "Customer service inquiries:",
            text: "information you provide when requesting a quote, tracking a shipment, or contacting our support team."
          }
        ]
      },
      {
        heading: "Information Collected Automatically",
        items: [
          {
            term: "Website usage data:",
            text: "IP address, browser type, operating system, referring URLs, pages viewed, and time spent on our site."
          },
          {
            term: "Cookies and tracking:",
            text: "standard session and analytics cookies used to optimize website performance and your browsing experience."
          }
        ]
      }
    ]
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "Mandy Express uses the information it collects solely for legitimate business and transportation purposes, including:"
    ],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Service fulfillment:",
            text: "scheduling, dispatching our Sprinter cargo vans, delivering packages, and obtaining Proof of Delivery."
          },
          {
            term: "Communication:",
            text: "providing shipment updates, tracking information, quotes, and customer support."
          },
          {
            term: "Billing and administration:",
            text: "processing payments, managing accounts, and issuing invoices."
          },
          {
            term: "Service optimization:",
            text: "analyzing delivery performance and improving how our website works."
          },
          {
            term: "Legal and safety:",
            text: "complying with provincial and federal transportation, customs, and safety regulations."
          }
        ]
      }
    ]
  },
  {
    title: "4. Disclosure and Sharing of Information",
    body: [
      "We do not sell, rent, or trade your personal information. We share it only in limited circumstances:"
    ],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Service providers and logistics partners:",
            text: "trusted third-party vendors such as payment processors and dispatch software providers, acting strictly on our behalf under confidentiality agreements."
          },
          {
            term: "Recipients and consignees:",
            text: "the delivery details needed by the designated recipient of a shipment, such as driver arrival alerts or Proof of Delivery signature requests."
          },
          {
            term: "Legal and regulatory obligations:",
            text: "when required by law, subpoena, or government authorities, or to protect the safety, rights, and property of Mandy Express, our drivers, or the public."
          }
        ]
      }
    ]
  },
  {
    title: "5. Data Security and Protection",
    body: [
      "We implement commercially reasonable physical, technical, and administrative safeguards to protect your personal data against loss, theft, unauthorized access, disclosure, or modification."
    ],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Data transmission:",
            text: "SSL/TLS encryption for information sent through our website."
          },
          {
            term: "Access control:",
            text: "access to personal information is restricted to authorized employees and dispatch staff who need it to perform their duties."
          }
        ]
      }
    ]
  },
  {
    title: "6. Data Retention",
    body: [
      "We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or to comply with applicable legal, accounting, and regulatory requirements such as tax and freight manifest record-keeping.",
      "Once the information is no longer needed, it is securely destroyed or anonymized."
    ],
    groups: []
  },
  {
    title: "7. Your Rights and Choices",
    body: [
      "Depending on where you live, including Ontario and Quebec, you have the right to:"
    ],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Access and correction:",
            text: "request access to, or correction of, the personal information we hold about you."
          },
          {
            term: "Withdraw consent:",
            text: "withdraw your consent to our processing of your information at any time, subject to legal or contractual constraints."
          },
          {
            term: "Quebec privacy rights:",
            text: "residents of Quebec may request information about automated processing of their data or exercise the specific rights granted by Bill 25."
          }
        ]
      }
    ]
  },
  {
    title: "8. Third-Party Links",
    body: [
      "Our website may contain links to external sites such as mapping services or social media platforms. Mandy Express is not responsible for the privacy practices or content of these platforms, and we encourage you to review their respective privacy policies."
    ],
    groups: []
  },
  {
    title: "9. Updates to This Policy",
    body: [
      "Mandy Express reserves the right to modify or update this Privacy Policy at any time. Any change is posted directly on this page along with a revised “Last Updated” date."
    ],
    groups: []
  }
];

const termsSections: LegalSection[] = [
  {
    title: "1. Scope of Services",
    body: [
      "Mandy Express provides express same-day freight, courier, and direct door-to-door transportation services using dedicated light commercial vehicles — primarily Sprinter cargo vans — operating within the Greater Toronto Area (GTA), the Greater Montreal Area (GMA), and the connecting Highway 401 corridor."
    ],
    groups: []
  },
  {
    title: "2. Cargo Limits and Specifications",
    body: ["Every shipment must fit within the capacity of our Sprinter cargo van fleet."],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Weight and volume limits:",
            text: "all cargo must conform to the legal payload and physical dimension limits of our Sprinter vans, typically a maximum payload of approximately 3,000 lbs (1,360 kg), subject to vehicle specifications."
          },
          {
            term: "Customer responsibility:",
            text: "the Shipper is responsible for providing accurate dimensions, weights, and descriptions of the cargo at the time of booking. If the shipment exceeds the booked capacity, additional fees may apply or the service may be cancelled."
          }
        ]
      }
    ]
  },
  {
    title: "3. Prohibited and Dangerous Goods",
    body: ["The following restrictions apply to every shipment tendered to Mandy Express:"],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Hazardous materials:",
            text: "unless approved by us in writing beforehand, Mandy Express does not transport hazardous materials, dangerous goods regulated under the Transportation of Dangerous Goods (TDG) rules, explosives, or radioactive substances."
          },
          {
            term: "Prohibited items:",
            text: "firearms, illegal substances, contraband, live animals, unsealed liquids, and extremely high-value personal effects such as loose cash, bullion, or fine jewellery are strictly prohibited."
          },
          {
            term: "Inspection rights:",
            text: "Mandy Express reserves the right to inspect any package or cargo tendered for transportation in order to confirm compliance and safety."
          }
        ]
      }
    ]
  },
  {
    title: "4. Quotes, Rates, and Payment Terms",
    body: ["A quote is prepared for each shipment and confirmed before pickup."],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Rates:",
            text: "quotes are based on distance, pickup and delivery urgency, weight, volume, and the waiting time required."
          },
          {
            term: "Additional charges:",
            text: "fees may apply for driver wait times beyond the standard 15-minute grace period at pickup or delivery, for redirection, for attempted or failed deliveries caused by incorrect information, and for tailgate requirements."
          },
          {
            term: "Payment terms:",
            text: "payment is due upon receipt of the invoice or at the time of booking, unless credit terms have been approved in writing. Overdue accounts are subject to interest of 1.5% per month (18% per year)."
          }
        ]
      }
    ]
  },
  {
    title: "5. Proof of Delivery and Same-Day Service",
    body: [
      "Mandy Express confirms every completed shipment and works to meet the delivery window agreed at booking."
    ],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Proof of Delivery:",
            text: "a delivery is considered complete once a physical or electronic signature, photo proof, or dispatch confirmation is obtained at the designated recipient address."
          },
          {
            term: "Service commitments:",
            text: "while we make every reasonable effort to complete same-day deliveries within the estimated timeframe, performance may be affected by severe weather, traffic congestion, road closures, or force majeure events. Estimated arrival times are not guaranteed unless specifically contracted."
          }
        ]
      }
    ]
  },
  {
    title: "6. Claims, Liability, and Limitation of Liability",
    body: ["The following limits apply to all cargo carried by Mandy Express:"],
    groups: [
      {
        heading: "",
        items: [
          {
            term: "Standard liability limit:",
            text: "unless a higher value is declared and paid for before pickup, our maximum liability for loss of, damage to, or delay of cargo is limited to $2.00 CAD per pound ($4.41 CAD per kg) calculated on the weight of the affected item, or $100.00 CAD per shipment, whichever is lower."
          },
          {
            term: "Notice of claim:",
            text: "any claim for loss, damage, or shortage must be reported to Mandy Express in writing within 48 hours of delivery, or of the scheduled delivery date in the case of a lost shipment."
          },
          {
            term: "Consequential damages:",
            text: "Mandy Express is not liable for any indirect, incidental, special, or consequential damages, including loss of income, profits, interest, or business opportunity."
          }
        ]
      }
    ]
  },
  {
    title: "7. Force Majeure",
    body: [
      "Mandy Express is not liable for any failure to perform, or delay in performing, caused by circumstances beyond its reasonable control, including but not limited to severe weather, natural disasters, highway closures, strikes, civil unrest, or acts of government authorities."
    ],
    groups: []
  },
  {
    title: "8. Governing Law and Jurisdiction",
    body: [
      "These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the Province of Quebec, depending on the jurisdiction where the service originates, together with the federal laws of Canada that apply therein."
    ],
    groups: []
  }
];

export const en = {
  langSwitcher: {
    short: "FR",
    full: "Français",
    ariaLabel: "Passer au français"
  },
  nav: {
    home: "Home",
    services: "Services",
    fleet: "Fleet",
    route: "Route",
    about: "About Us",
    contact: "Contact"
  },
  header: {
    homeAria: "Mandy Express home",
    primaryNav: "Primary navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu"
  },
  common: {
    getAQuote: "Get a Quote"
  },
  cookieConsent: {
    ariaLabel: "Cookie consent",
    message:
      "We use cookies to improve your browsing experience and remember your preferences. By clicking “Accept”, you agree to our use of cookies.",
    accept: "Accept",
    decline: "Decline"
  },
  meta: {
    root: {
      title: "Mandy Express | Same-Day Freight Delivery",
      description:
        "Same-day freight delivery between Toronto and Montreal along Highway 401. Daily door-to-door cargo van service, every business day.",
      ogImageAlt: "Mandy Express cargo van on Highway 401 between Montreal and Toronto"
    },
    services: {
      title: "Our Services",
      description:
        "Daily freight service between Montreal and Toronto along Highway 401: same-day delivery, door-to-door pickup and drop-off, and careful cargo handling every business day."
    },
    fleet: {
      title: "Our Fleet",
      description:
        "Modern cargo vans with up to 477 cu ft of cargo space, 3,500 lbs payload, and rear and side door access — sized for fast, flexible freight between Montreal and Toronto."
    },
    route: {
      title: "Our Route",
      description:
        "The Highway 401 corridor between Montreal and Toronto: departures every business day, same-day delivery, and direct door-to-door service with no terminal transfers."
    },
    about: {
      title: "About Us",
      description:
        "Same-day freight between Toronto (TRT) and Montreal (MTL): direct B2B point-to-point service, a Sprinter 2500 High-Roof Extended fleet, AZ-licensed drivers, and strict safety standards."
    },
    contact: {
      title: "Contact Us",
      description:
        "Request a freight quote or reach the Mandy Express team: call 438-921-7268 or email info@mandyexpress.ca for same-day shipping between Montreal and Toronto."
    },
    privacy: {
      title: "Privacy Policy",
      description:
        "How Mandy Express collects, uses, and protects the personal information of clients, drivers, and website visitors, in compliance with PIPEDA and Quebec's Bill 25."
    },
    terms: {
      title: "Terms & Conditions",
      description:
        "The terms governing Mandy Express same-day freight service: cargo limits, prohibited goods, rates and payment, proof of delivery, claims, and liability limits."
    }
  },
  home: {
    heroAria: "Mandy Express same-day freight delivery",
    heroAlt:
      "Mandy Express same-day freight delivery from Toronto to Montreal along Highway 401 with a 2025 Mercedes-Benz Sprinter Extended High Roof",
    services: [
      {
        title: "Same-Day Delivery",
        lines: ["Pick up in the morning.", "Deliver the same day."]
      },
      {
        title: "Daily Dedicated Service",
        lines: ["Toronto ↔ Montreal", "Every business day."]
      },
      {
        title: "Door-to-Door",
        lines: ["No terminal transfers.", "Direct to your door."]
      },
      {
        title: "401 Corridor Specialists",
        lines: ["One route.", "One focus."]
      }
    ]
  },
  footer: {
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    tagline: "More Than Cargo. Your Trust, Our Priority.",
    copyright: "© {year} Mandy Express Freight Service. All Rights Reserved.",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions"
  },
  quote: {
    title: "Request a Quote",
    subtitle: "Fast. Reliable. Same-Day Delivery. Toronto ↔ Montreal Along Highway 401",
    closeAria: "Close quote form",
    successTitle: "Request Sent",
    successBody: "Thank you. Your quote request has been sent to info@mandyexpress.ca.",
    close: "Close",
    contactInfo: "Contact Information",
    fullName: "Full Name",
    fullNamePlaceholder: "Your name",
    phone: "Phone Number",
    phonePlaceholder: "(514) 123-4567",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    contactHint: "* Phone or email — please fill in at least one so we can reach you.",
    contactRequired: "Please provide a phone number or an email address.",
    shipmentInfo: "Shipment Information",
    pickupLocation: "Pick-up Location",
    pickupLocationPlaceholder: "Select city",
    deliveryLocation: "Delivery Location",
    deliveryLocationPlaceholder: "Select city",
    locationOptions: ["Toronto", "Montreal"],
    pickupDate: "Service Date",
    requiredDeliveryTime: "Required Delivery Time",
    deliveryTimePlaceholder: "Select time",
    deliveryTimeOptions: [
      "Same-Day Delivery",
      "Next-Day Delivery",
      "Flexible Delivery",
      "Morning Delivery",
      "Afternoon Delivery"
    ],
    additionalDetails: "Additional Details",
    restrictionsHeading: "Fleet Security & Cargo Restrictions",
    restrictionsIntro:
      "To guarantee absolute regulatory safety compliance, transport hygiene, and legal parameters across provincial borders, the following categorical bans are strictly enforced:",
    restrictions: [
      {
        title: "No Temperature-Controlled Goods",
        text: "To safeguard rigorous express line-haul schedules and protect standard asset allocation, we do not support or accept deep-freeze, chilled, or refrigerated items."
      },
      {
        title: "No Hazardous Materials (Hazmat)",
        text: "Flammable chemical formulations, explosive elements, lithium battery arrays, or volatile industrial compounds are strictly prohibited to ensure custody protection."
      },
      {
        title: "No Live Animals / Sanitary Contraband",
        text: "Livestock, pets, organic biological items, or legally restricted agricultural commodities are fully barred to guarantee pristine, completely sanitized cargo chambers."
      }
    ],
    palletSizeNote: "1 pallet: 48 × 40 × 63 (L × W × H) inches",
    numberOfPallets: "Number of Pallets",
    palletsPlaceholder: "Quantity",
    approximateWeight: "Approximate Weight",
    weightPlaceholder: "Weight in lbs",
    additionalNotes: "Additional Notes",
    notesPlaceholder: "Write your message here...",
    submit: "Submit Request",
    submitting: "SENDING...",
    secureNote: "Your information is secure and will only be used to respond to your request.",
    errorFallback:
      "We could not send the request. Please email info@mandyexpress.ca or call 438-921-7268."
  },
  contactPage: {
    heroAria: "Contact Mandy Express",
    heroTitle: "Contact Us",
    heroSubtitle: "We're here to help. Get in touch with our team.",
    mainAria: "Contact information and message form",
    infoHeading: "Contact Information",
    phone: "Phone",
    email: "Email",
    website: "Website",
    office: "Office",
    officeLines: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"],
    hours: "Business Hours",
    hoursLines: ["Mon – Fri: 8:00 AM – 6:00 PM", "Sat – Sun: By appointment only"],
    formHeading: "Send Us a Message"
  },
  contactForm: {
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    serviceLabel: "Type of Service",
    servicePlaceholder: "Type of Service",
    serviceTypes: [
      "Same-Day Delivery",
      "Daily Freight Service",
      "Door-to-Door Service",
      "Dedicated Cargo Van",
      "Moving Service",
      "Other"
    ],
    messageLabel: "Your Message",
    errors: {
      name: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      message: "Please enter your message.",
      fallback:
        "We could not send your message. Please call 438-921-7268 or email info@mandyexpress.ca."
    },
    successTitle: "Message Sent",
    successBody: "Thank you. We received your message and will respond as soon as possible.",
    sendAnother: "Send Another Message",
    submit: "Send Message",
    submitting: "Sending..."
  },
  servicesPage: {
    heroAria: "Mandy Express freight solutions",
    heroImageAlt:
      "2025 Mercedes-Benz Sprinter Extended High Roof cargo van with Mandy Express logo and slogan on Highway 401 near Toronto",
    eyebrow: "Our Services",
    heroTitleLines: ["Freight Solutions", "You Can Count On"],
    heroText:
      "We provide fast, reliable, and secure freight transportation along the Montreal-Toronto corridor.",
    whatWeOffer: "What We Offer",
    offers: [
      {
        title: "Daily Freight Service",
        text: "Daily service between Montreal and Toronto along Highway 401. Every business day."
      },
      {
        title: "Same-Day Delivery",
        text: "Time-sensitive shipments delivered the same day. Fast, efficient, and reliable."
      },
      {
        title: "Door-to-Door Service",
        text: "Direct pickup and delivery to your door. No terminal transfers."
      },
      {
        title: "Dedicated Cargo Van",
        text: "One shipment. One vehicle. One driver. Maximum safety and control."
      }
    ],
    whyChoose: "Why Choose Mandy Express?",
    reasons: [
      {
        title: "Reliable & Safe",
        text: "Well-maintained vehicles and professional drivers you can trust."
      },
      {
        title: "On-Time Delivery",
        text: "We value your time and deliver as promised."
      },
      {
        title: "401 Corridor Experts",
        text: "Specialized in the Montreal-Toronto freight corridor."
      },
      {
        title: "Dedicated Support",
        text: "Friendly team here to help with all your shipping needs."
      }
    ],
    howItWorks: "How It Works",
    steps: [
      {
        title: "Request a Quote",
        text: "Contact us with your shipment details."
      },
      {
        title: "Pickup",
        text: "We pick up your freight at your location."
      },
      {
        title: "On the Way",
        text: "Your freight is on its way via Highway 401."
      },
      {
        title: "Delivered",
        text: "Delivered safely and on time to your destination."
      }
    ]
  },
  fleetPage: {
    heroAria: "Mandy Express fleet",
    eyebrow: "Our Fleet",
    heroTitleLines: ["Built for Speed.", "Built for Reliability."],
    heroText:
      "Our modern fleet of cargo vans is designed to deliver your freight safely, quickly, and on time along the Montreal-Toronto corridor.",
    heroImageAlt: "Mandy Express 2025 Mercedes-Benz Sprinter Extended High Roof on Highway 401 near Toronto",
    cargoVanHeading: "Our Cargo Van",
    vanImageAlt: "Mandy Express 2025 Mercedes-Benz Sprinter Extended High Roof cargo van",
    vanName: "Sprinter Cargo Van",
    vanText: "Spacious, clean, and equipped to handle your freight with care. Ideal for time-sensitive shipments.",
    specs: [
      { label: "Cargo Space", value: "Up to 477 cu ft" },
      { label: "Payload Capacity", value: "Up to 3,500 lbs" },
      { label: "Length", value: "Up to 165 in" },
      { label: "Height", value: "Up to 75 in" },
      { label: "Width", value: "Up to 67 in" },
      { label: "Access", value: "Rear & Side Door" }
    ],
    advantagesHeading: "Fleet Advantages",
    advantages: [
      {
        title: "Reliable & Safe",
        text: "Well-maintained fleet ensuring the safety of your cargo."
      },
      {
        title: "On-Time Delivery",
        text: "Built for speed and efficiency along Highway 401."
      },
      {
        title: "Dedicated Service",
        text: "One shipment. One vehicle. One driver."
      },
      {
        title: "Secure Handling",
        text: "Your freight is handled with care from pickup to delivery."
      }
    ],
    ctaAria: "Need freight service",
    ctaTitle: "Need Freight Service?",
    ctaText: "Contact us today for a fast and accurate quote."
  },
  routePage: {
    heroAria: "Mandy Express Highway 401 route",
    toronto: "Toronto",
    montreal: "Montreal",
    heroSubtitle: "Daily Freight Service Along Highway 401",
    corridorHeading: "The 401 Corridor",
    mapAria: "Map of the Highway 401 route from Toronto to Montreal",
    coverageNote: "We serve every town along the corridor between Montreal and Toronto.",
    coverageSoon: "More cities coming soon."
  },
  aboutPage: {
    heroAria: "About Mandy Express",
    heroImageAlt: "Mandy Express Sprinter cargo van running the Highway 401 corridor at dusk",
    eyebrow: "Toronto (TRT) ↔ Montreal (MTL)",
    heroTitleLines: ["Efficient. Secure.", "Direct."],
    heroAccent: "Same-Day.",
    heroLead:
      "We are a modern freight delivery service dedicated to same-day arrivals between Toronto (TRT) and Montreal (MTL) — direct B2B, point to point, with no transit hubs in between.",
    fleetCta: "See Our Fleet",
    stats: [
      { value: "Same-Day", label: "Arrivals between Toronto and Montreal" },
      { value: "B2B Direct", label: "Point to point, no transit hubs" },
      { value: "AZ", label: "Licensed drivers on every route" },
      { value: "15 min / 2 h", label: "Mandatory rest, strictly enforced" }
    ],
    missionEyebrow: "Our Mission",
    missionTitleLines: ["Efficiency, Time Savings,", "and Premium Quality."],
    missionParagraphs: [
      "We always put our clients' trust and the safety of their cargo first.",
      "By operating on a direct B2B model, we eliminate unnecessary handling and intermediate hassles, ensuring true point-to-point service."
    ],
    missionQuote: "Prompt pickup. Direct delivery.",
    guaranteesEyebrow: "What You Get, Every Time",
    guaranteesHeading: "Our 4 Core Guarantees",
    guaranteesLead: "Four commitments behind every shipment we move on the 401 corridor.",
    fleetImageAlt: "Interior cargo space of a Mandy Express Sprinter 2500 High-Roof Extended van",
    guarantees: [
      {
        title: "Direct & Efficient",
        text: "Say goodbye to transit hubs and complex handoffs. Our point-to-point direct delivery significantly cuts transit times."
      },
      {
        title: "Premium Fleet",
        text: "Our entire fleet consists of Benz Sprinter 2500 High-Roof Extended vans — strong performance, reliability, and spacious cargo capacity that keeps your goods safe."
      },
      {
        title: "AZ-Licensed Drivers",
        text: "Every driver on our team holds a valid AZ truck licence, bringing top-tier driving skill and extensive highway experience."
      },
      {
        title: "Strict Safety Standards",
        text: "We enforce a mandatory 15-minute rest break every 2 hours of driving. A well-rested driver is the ultimate guarantee of your cargo's safety."
      }
    ],
    compareEyebrow: "The Difference",
    compareHeading: "Why Direct Wins",
    compareOldTitle: "Hub-and-Spoke Freight",
    compareOldSteps: [
      "Pickup, then a wait for the next line-haul",
      "Sorting terminal, first handling",
      "Transfer between trailers",
      "Second terminal, second handling",
      "Delivery on the network's schedule"
    ],
    compareNewTitle: "Mandy Express Point-to-Point",
    compareNewSteps: [
      "Prompt pickup at your door",
      "One van, one driver, straight down the 401",
      "Direct delivery the same business day"
    ],
    compareNote: "One team accountable from pickup to signature.",
    ctaAria: "Partner with Mandy Express",
    ctaTitle: "Leave the Freight to Us",
    ctaText: "Focus on your business. We look forward to building a strong, long-term partnership with you."
  },
  privacyPage: {
    heroAria: "Mandy Express privacy policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: [
      "Mandy Express is the operating name of 17677995 Canada Inc. (“Mandy Express”, “we”, “us”, or “our”). We are committed to protecting the privacy, accuracy, and security of the personal information collected from our clients, drivers, website visitors, and business partners across Toronto, Montreal, and the surrounding regions.",
      "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, request a same-day freight or courier quote, or use our transportation and logistics services."
    ],
    effectiveLabel: "Effective Date",
    effectiveDate: "July 28, 2026",
    updatedLabel: "Last Updated",
    updatedDate: "July 28, 2026",
    tocHeading: "On This Page",
    tocAria: "Privacy policy sections",
    sections: privacySections,
    contact: {
      title: "10. Contact Information and Privacy Officer",
      body: "If you have questions, concerns, or requests regarding this Privacy Policy or the way your personal information is handled, please contact our designated Privacy Officer:",
      office: "Mandy Express Privacy Office",
      legalName: "17677995 Canada Inc., operating as Mandy Express",
      emailLabel: "Email",
      email: "info@mandyexpress.ca",
      phoneLabel: "Phone",
      phone: "438-921-7268",
      areasLabel: "Service Areas",
      areas: "Greater Toronto Area (GTA) and Greater Montreal Area (GMA)",
      addressLabel: "Address",
      addressLines: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"]
    }
  },
  termsPage: {
    heroAria: "Mandy Express terms and conditions of service",
    eyebrow: "Legal",
    title: "Terms & Conditions of Service",
    intro: [
      "Please read these Terms and Conditions (“Terms”) carefully before using our services or our website, or booking transportation with 17677995 Canada Inc., doing business as Mandy Express (“Mandy Express”, the “Company”, “we”, “us”, or “our”).",
      "By booking a shipment, accessing our website, or using our same-day transport services, you (“Customer”, “Shipper”, or “Consignee”) agree to be bound by these Terms."
    ],
    effectiveLabel: "Effective Date",
    effectiveDate: "July 28, 2026",
    updatedLabel: "Last Updated",
    updatedDate: "July 28, 2026",
    tocHeading: "On This Page",
    tocAria: "Terms and conditions sections",
    sections: termsSections,
    contact: {
      title: "9. Questions About These Terms",
      body: "If you have questions about these Terms, or about a specific shipment, booking, or invoice, please contact our team:",
      office: "Mandy Express Freight Service",
      legalName: "17677995 Canada Inc., operating as Mandy Express",
      emailLabel: "Email",
      email: "info@mandyexpress.ca",
      phoneLabel: "Phone",
      phone: "438-921-7268",
      areasLabel: "Service Areas",
      areas: "Greater Toronto Area (GTA) and Greater Montreal Area (GMA)",
      addressLabel: "Address",
      addressLines: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"]
    }
  }
};

export type Dictionary = typeof en;
