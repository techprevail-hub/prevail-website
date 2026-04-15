import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://withprevail.com";
  const pages = [
    { url: "/", priority: 1.0 },
    { url: "/for-institutions", priority: 0.9 },
    { url: "/for-individuals", priority: 0.9 },
    { url: "/for-executives", priority: 0.9 },
    { url: "/features", priority: 0.8 },
    { url: "/compare", priority: 0.8 },
    { url: "/waitlist", priority: 0.9 },
    { url: "/about", priority: 0.7 },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.priority,
  }));
}
