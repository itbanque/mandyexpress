import type { MetadataRoute } from "next";

const BASE_URL = "https://mandyexpress.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/fleet", priority: 0.8 },
    { path: "/route", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 }
  ];

  return routes.flatMap(({ path, priority }) => {
    const enUrl = `${BASE_URL}${path === "/" ? "" : path}`;
    const frUrl = `${BASE_URL}/fr${path === "/" ? "" : path}`;
    const alternates = {
      languages: {
        "en-CA": enUrl,
        "fr-CA": frUrl
      }
    };

    return [
      {
        url: enUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates
      },
      {
        url: frUrl,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates
      }
    ];
  });
}
