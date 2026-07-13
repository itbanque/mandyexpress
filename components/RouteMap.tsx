/* eslint-disable @next/next/no-img-element */

export default function RouteMap() {
  return (
    <section id="route" className="route-section" aria-label="Highway 401 route from Toronto to Montreal">
      <div className="container route-shell">
        <img
          src="/images/route-map-complete.png"
          alt="Our only route, Highway 401, dedicated same-day freight service between Toronto and Montreal"
          className="route-map-image"
        />
      </div>
    </section>
  );
}
