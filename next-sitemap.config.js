/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://feest.ai",
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
    sitemap: "https://feest.ai/sitemap.xml",
  },
};
