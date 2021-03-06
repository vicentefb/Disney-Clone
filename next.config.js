module.exports = {
  reactStrictMode: true,
  env: {
    GRAPH_CMS_API_TOKEN: process.env.GRAPH_CMS_API_TOKEN,
    ENDPOINT: process.env.ENDPOINT,
  },
  images: {
    domains: ["media.graphcms.com"],
  },
};
