import type { IConfig } from "next-sitemap";

const config: IConfig = {
  siteUrl: process.env.SITE_URL || "https://yourdomain.com",
  generateRobotsTxt: true,
  outDir: "public", // 👈 important for Vercel
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://yourdomain.com/server-sitemap.xml",
    ],
  },
};

export default config;
