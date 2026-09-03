/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "voiceops.in",
          },
        ],
        destination: "https://www.voiceops.in/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "lunor.co.in",
          },
        ],
        destination: "https://www.voiceops.in/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.lunor.co.in",
          },
        ],
        destination: "https://www.voiceops.in/:path*",
        permanent: true,
      },
      {
        source: "/capabilities",
        destination: "/#capabilities",
        permanent: false,
      },
      {
        source: "/use-cases",
        destination: "/#capabilities",
        permanent: false,
      },
      {
        source: "/industries",
        destination: "/#industries",
        permanent: false,
      },
      {
        source: "/work",
        destination: "/#work",
        permanent: false,
      },
      {
        source: "/process",
        destination: "/#process",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
