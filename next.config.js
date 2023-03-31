/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["upcdn.io", "replicate.delivery", "lh3.googleusercontent.com","media.licdn.com"],
  },
  async redirects() {
    return [
      // {
      //   source: "/github",
      //   destination: "https://github.com/",
      //   permanent: false,
      // },
      // {
      //   source: "/deploy",
      //   destination: "https://vercel.com/templates/next.js/",
      //   permanent: false,
      // },
    ];
  },
};
