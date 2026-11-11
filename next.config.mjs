/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// Sub-path the site is served from. Empty for a user/org site
// (<user>.github.io) or a custom domain; "/<repo>" for a project site.
// The deploy workflow sets BASE_PATH from GitHub Pages. Next rewrites its own
// script and stylesheet URLs, but not a plain string src or a raw <video src>,
// so it is also published to the client for asset() in src/lib/media.ts.
const basePath = isProd ? (process.env.BASE_PATH ?? "") : "";

const imagekit = process.env.NEXT_PUBLIC_IMAGEKIT_URL;

const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // Only needed when a remote CDN is configured (see src/lib/media.ts).
    ...(imagekit && {
      remotePatterns: [
        { protocol: "https", hostname: new URL(imagekit).hostname },
      ],
    }),
    ...(isProd && { unoptimized: true }),
  },
  // In production (GitHub Pages, no server) statically export. In local dev
  // we skip export so the dev server provides live image optimization.
  ...(isProd && {
    output: "export",
    ...(basePath && { basePath, assetPrefix: `${basePath}/` }),
  }),
};

export default nextConfig;
