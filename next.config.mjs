/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http://http2.mlstatic.com",
      },
    ],
  },
};

export default nextConfig;
