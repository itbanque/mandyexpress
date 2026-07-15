import {
  CalendarDays,
  Clock3,
  DoorOpen,
  Map,
  MapPin,
  Package,
  Truck
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteButton from "@/components/QuoteButton";
import QuoteModal from "@/components/QuoteModal";

const highlights = [
  {
    icon: CalendarDays,
    title: "Daily Service",
    lines: ["Montreal to Toronto", "Every Business Day"]
  },
  {
    icon: Clock3,
    title: "Same-Day Delivery",
    lines: ["Fast, reliable and", "on-time delivery"]
  },
  {
    icon: DoorOpen,
    title: "Door-to-Door",
    lines: ["Direct pickup and delivery", "No terminal transfers"]
  },
  {
    icon: Truck,
    title: "Dedicated Cargo Van",
    lines: ["One shipment.", "One vehicle. One driver."]
  }
];

const details = [
  {
    icon: MapPin,
    title: "Distance",
    lines: ["Approx. 545 KM"]
  },
  {
    icon: Clock3,
    title: "Drive Time",
    lines: ["Approx. 5.5 - 6.5 Hours"]
  },
  {
    icon: Map,
    title: "Major Stops",
    lines: ["Cornwall, Kingston,", "Belleville, Oshawa"]
  },
  {
    icon: CalendarDays,
    title: "Frequency",
    lines: ["Daily (Mon - Fri)", "Saturday Service Available"]
  },
  {
    icon: Package,
    title: "Capacity",
    lines: ["Dedicated Cargo Van", "Up to 3500 KG"]
  }
];

function HighwayShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 92 92" aria-hidden="true">
      <path
        d="M46 8c12 8 24 8 36 4v24c0 23-13 38-36 48C23 74 10 59 10 36V12c12 4 24 4 36-4Z"
        fill="#0b2345"
      />
      <text x="46" y="57" textAnchor="middle" className="route-shield-text">
        401
      </text>
    </svg>
  );
}

function CorridorMap() {
  const stops = [
    { name: "Toronto", x: 90, y: 170, labelX: 62, labelY: 238, anchor: "start" },
    { name: "Oshawa", x: 260, y: 188, labelX: 215, labelY: 242, anchor: "middle" },
    { name: "Belleville", x: 435, y: 225, labelX: 375, labelY: 285, anchor: "middle" },
    { name: "Kingston", x: 650, y: 245, labelX: 600, labelY: 305, anchor: "middle" },
    { name: "Cornwall", x: 890, y: 295, labelX: 830, labelY: 355, anchor: "middle" },
    { name: "Montreal", x: 1110, y: 350, labelX: 1035, labelY: 410, anchor: "end" }
  ];
  const routePath =
    "M 90 170 C 150 145, 210 155, 260 188 C 320 205, 380 220, 435 225 C 500 230, 575 240, 650 245 C 725 250, 810 275, 890 295 C 965 315, 1035 340, 1110 350";

  return (
    <div className="route-map-illustration" aria-label="Static route map from Toronto to Montreal along Highway 401">
      <svg viewBox="0 0 1200 420" role="img" aria-label="Toronto to Montreal Highway 401 route" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="routeWater" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d9ecfb" />
            <stop offset="1" stopColor="#bdddf4" />
          </linearGradient>
          <filter id="mapSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0b2345" floodOpacity="0.08" />
          </filter>
        </defs>

        <rect width="1200" height="420" fill="#f6faf8" />
        <path
          d="M0 258 C120 232 248 256 362 246 C500 232 604 270 738 255 C904 238 1030 258 1200 238 L1200 420 L0 420 Z"
          fill="url(#routeWater)"
        />
        <path
          d="M22 326 C155 292 292 320 420 294 C572 264 722 305 866 278 C1002 252 1102 281 1200 260"
          fill="none"
          stroke="#b6d8ef"
          strokeWidth="24"
          opacity="0.5"
        />
        <path
          d="M80 76 C170 58 248 82 346 68 C478 50 574 88 708 72 C840 56 935 82 1052 64 C1116 54 1162 58 1200 52"
          fill="none"
          stroke="#d8eadf"
          strokeWidth="14"
          opacity="0.42"
        />
        <path
          d="M40 140 C135 122 220 142 310 132 C445 116 558 144 680 132 C830 116 940 146 1088 126 C1130 120 1166 122 1200 116"
          fill="none"
          stroke="#d7ebf8"
          strokeWidth="9"
          opacity="0.55"
        />
        <text x="575" y="360" textAnchor="middle" className="route-lake-label">
          LAKE ONTARIO
        </text>

        <path
          d={routePath}
          fill="none"
          stroke="#c9522a"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#mapSoftShadow)"
        />
        <path
          d={routePath}
          fill="none"
          stroke="#ff6a00"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={routePath}
          fill="none"
          stroke="#ffb27b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 20"
          opacity="0.55"
        />

        <g transform="translate(615 205) scale(1.12)">
          <path d="M0 0c8 5 17 5 25 2v18c0 16-9 27-25 34C-16 47-25 36-25 20V2C-17 5-8 5 0 0Z" fill="#fff" stroke="#0b2345" strokeWidth="3" />
          <text x="0" y="31" textAnchor="middle" className="route-map-shield-text">
            401
          </text>
        </g>

        <g transform="translate(90 109) scale(0.68)">
          <path d="M0 0c-18 0-32 14-32 32 0 25 32 58 32 58s32-33 32-58C32 14 18 0 0 0Z" fill="#ff6a00" />
          <circle cx="0" cy="31" r="11" fill="#fff" />
        </g>
        <g transform="translate(1110 289) scale(0.68)">
          <path d="M0 0c-18 0-32 14-32 32 0 25 32 58 32 58s32-33 32-58C32 14 18 0 0 0Z" fill="#ff6a00" />
          <circle cx="0" cy="31" r="11" fill="#fff" />
        </g>

        {stops.slice(1, -1).map((stop) => (
          <circle cx={stop.x} cy={stop.y} r="9" fill="#071d3b" stroke="#fff" strokeWidth="4" key={stop.name} />
        ))}
        {stops.map((stop) => (
          <text
            x={stop.labelX}
            y={stop.labelY}
            textAnchor={stop.anchor as "start" | "middle" | "end"}
            className="route-city-label"
            key={stop.name}
          >
            {stop.name}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function RoutePage() {
  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="Route" />

      <section className="container route-hero" aria-label="Mandy Express Highway 401 route">
        <h1>
          <span>Toronto</span>
          <span className="route-arrow" aria-hidden="true">↔</span>
          <HighwayShield className="route-hero-shield" />
          <span className="route-arrow" aria-hidden="true">↔</span>
          <span>Montreal</span>
        </h1>
        <p>Daily Freight Service Along Highway 401</p>
        <QuoteButton />
      </section>

      <section className="container route-corridor-section" aria-labelledby="corridor-heading">
        <div className="route-section-heading">
          <h2 id="corridor-heading">The 401 Corridor</h2>
          <span />
        </div>
        <CorridorMap />
      </section>

      <section className="container route-highlights" aria-label="Route service highlights">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          return (
            <article className={`route-info-column ${index > 0 ? "route-column-divider" : ""}`} key={highlight.title}>
              <Icon size={50} strokeWidth={2} />
              <h3>{highlight.title}</h3>
              {highlight.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          );
        })}
      </section>

      <section className="container route-details-section" aria-labelledby="details-heading">
        <div className="route-section-heading">
          <h2 id="details-heading">Route Details</h2>
          <span />
        </div>
        <div className="route-details-grid">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <article className={`route-detail-column ${index > 0 ? "route-column-divider" : ""}`} key={detail.title}>
                <Icon size={34} strokeWidth={1.9} />
                <h3>{detail.title}</h3>
                {detail.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
      <QuoteModal />
    </main>
  );
}
