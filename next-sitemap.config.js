/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://my-library-dun.vercel.app",
  generateRobotsTxt: true,
  outDir: "public", // 👈 important for Vercel
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://my-library-dun.vercel.app/server-sitemap.xml",
    ],
  },
};

export default config;
