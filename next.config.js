/** @type {import('next').NextConfig} */
const defaultTheme = require("tailwindcss/defaultTheme");
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "upcdn.io",
      "replicate.delivery",
      "lh3.googleusercontent.com",
      "media.licdn.com",
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        "custom-font": ["League Gothic", "system-ui", "sans-serif"],
        sans: ["Roboto"],
        "sans-serif": ["League Gothic"],
      },
    },
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
