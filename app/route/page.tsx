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
    { name: "Montreal", x: 88, y: 115, anchor: "start" },
    { name: "Cornwall", x: 255, y: 160, anchor: "middle" },
    { name: "Kingston", x: 390, y: 192, anchor: "middle" },
    { name: "Belleville", x: 555, y: 228, anchor: "middle" },
    { name: "Oshawa", x: 780, y: 278, anchor: "middle" },
    { name: "Toronto", x: 965, y: 318, anchor: "end" }
  ];

  return (
    <div className="route-map-illustration" aria-label="Static route map from Montreal to Toronto along Highway 401">
      <svg viewBox="0 0 1040 420" role="img">
        <title>Montreal to Toronto Highway 401 route</title>
        <defs>
          <linearGradient id="routeWater" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d9ecfb" />
            <stop offset="1" stopColor="#bdddf4" />
          </linearGradient>
          <filter id="mapSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0b2345" floodOpacity="0.08" />
          </filter>
        </defs>

        <rect width="1040" height="420" fill="#f6faf8" />
        <path
          d="M0 252 C120 232 210 258 310 245 C430 230 520 265 635 250 C780 230 890 255 1040 238 L1040 420 L0 420 Z"
          fill="url(#routeWater)"
        />
        <path
          d="M26 318 C145 286 253 316 356 292 C485 262 604 304 721 277 C835 250 933 280 1040 260"
          fill="none"
          stroke="#b6d8ef"
          strokeWidth="26"
          opacity="0.55"
        />
        <text x="500" y="354" textAnchor="middle" className="route-lake-label">
          LAKE ONTARIO
        </text>

        <path
          d="M88 115 C170 136 203 148 255 160 S338 180 390 192 S502 216 555 228 S695 254 780 278 S910 302 965 318"
          fill="none"
          stroke="#c9522a"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#mapSoftShadow)"
        />
        <path
          d="M88 115 C170 136 203 148 255 160 S338 180 390 192 S502 216 555 228 S695 254 780 278 S910 302 965 318"
          fill="none"
          stroke="#ff6a00"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 18"
          opacity="0.95"
        />

        <g transform="translate(595 206)">
          <path d="M0 0c8 5 17 5 25 2v18c0 16-9 27-25 34C-16 47-25 36-25 20V2C-17 5-8 5 0 0Z" fill="#fff" stroke="#0b2345" strokeWidth="3" />
          <text x="0" y="31" textAnchor="middle" className="route-map-shield-text">
            401
          </text>
        </g>

        <g transform="translate(88 106)">
          <path d="M0 0c-18 0-32 14-32 32 0 25 32 58 32 58s32-33 32-58C32 14 18 0 0 0Z" fill="#ff6a00" />
          <circle cx="0" cy="31" r="11" fill="#fff" />
        </g>
        <g transform="translate(965 309)">
          <path d="M0 0c-18 0-32 14-32 32 0 25 32 58 32 58s32-33 32-58C32 14 18 0 0 0Z" fill="#ff6a00" />
          <circle cx="0" cy="31" r="11" fill="#fff" />
        </g>

        {stops.slice(1, -1).map((stop) => (
          <circle cx={stop.x} cy={stop.y} r="8" fill="#0b2345" stroke="#fff" strokeWidth="4" key={stop.name} />
        ))}
        {stops.map((stop) => (
          <text
            x={stop.x}
            y={stop.name === "Montreal" ? stop.y + 76 : stop.name === "Toronto" ? stop.y + 76 : stop.y + 34}
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
          <span>Montreal</span>
          <span className="route-arrow">→</span>
          <HighwayShield className="route-hero-shield" />
          <span className="route-arrow">→</span>
          <span>Toronto</span>
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
