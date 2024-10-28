import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
// api.meetingstation1.com
const nextConfig = {
  images: {
    domains: ["api.meetingstation1.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.meetingstation1.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
