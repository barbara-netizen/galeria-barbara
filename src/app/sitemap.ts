import type { MetadataRoute } from "next";
import { paintings } from "@/data/paintings";
import { illustrations } from "@/data/illustrations";
import { animations } from "@/data/animations";
import { ebooks } from "@/data/ebooks";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://barbaragutierrez.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/sobre-mi`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pintura`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ilustraciones`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/animaciones`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/obra-literaria`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const paintingRoutes: MetadataRoute.Sitemap = paintings.map((p) => ({
    url: `${siteUrl}/pintura/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const illustrationRoutes: MetadataRoute.Sitemap = illustrations.map((i) => ({
    url: `${siteUrl}/ilustraciones/${i.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const animationRoutes: MetadataRoute.Sitemap = animations.map((a) => ({
    url: `${siteUrl}/animaciones/${a.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const ebookRoutes: MetadataRoute.Sitemap = ebooks.map((b) => ({
    url: `${siteUrl}/obra-literaria/${b.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...paintingRoutes,
    ...illustrationRoutes,
    ...animationRoutes,
    ...ebookRoutes,
  ];
}
