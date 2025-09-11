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
        disallow: "/w",
      },
    ],
    sitemap: "https://lijstje.ai/sitemap.xml",
  },
};
