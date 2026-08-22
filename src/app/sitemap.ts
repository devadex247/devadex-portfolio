import { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { articles } from "@/content/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adextechhub.dev";

  // Static routes
  const routes = ["", "/work", "/engineering", "/experience", "/writing", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic projects
  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic articles
  const articleRoutes = articles.map((a) => ({
    url: `${baseUrl}/writing/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...articleRoutes];
}
