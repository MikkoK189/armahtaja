/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/attachments/**",
      },
      {
        protocol: "https",
        hostname: "raid-helper.dev",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "gorillat.fi",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};

module.exports = nextConfig;
