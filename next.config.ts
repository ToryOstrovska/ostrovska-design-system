import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Storybook лежить у public/storybook. Next.js прибирає скісну риску
  // (/storybook/ → /storybook), і тоді відносні шляхи Storybook ведуть
  // у корінь сайту. Тому ведемо одразу на index.html.
  redirects() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
        permanent: false,
      },
    ];
  },
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
