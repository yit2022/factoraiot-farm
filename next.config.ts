import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: "/factoraiot-farm",
        images: { unoptimized: true },
      }
    : {
        allowedDevOrigins: ["127.0.0.1"],
        cacheComponents: true,
        partialPrefetching: true,
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
