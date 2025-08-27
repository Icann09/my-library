/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://my-library-dun.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,

  // 👇 Add this to include dynamic routes
  additionalPaths: async (config) => {
    const books = [
      { id: "1", updatedAt: "2025-08-01" },
      { id: "2", updatedAt: "2025-08-15" },
    ];
    return books.map((book) => ({
      loc: `/books/${book.id}`,
      lastmod: book.updatedAt,
    }));
  },
};
