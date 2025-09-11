/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lijstje.ai",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/wishlist",
      },
    ],
    sitemap: "https://lijstje.ai/sitemap.xml",
  },
};
