/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// GitHub Pages serves the site from a sub-path. Next rewrites its own script
// and stylesheet URLs for that, but it does not touch a plain string src on
// next/image, and it cannot touch a raw <video src> or poster at all — those
// are ours to prefix. Published to the client so asset() can apply it.
const basePath = isProd ? "/my-portfolio" : "";

const nextConfig = {
    reactStrictMode: true,
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    images: {
      // Heavy stills and recordings come from ImageKit (src/lib/media.ts).
      // next/image refuses a remote host it has not been told about, so the
      // dev server needs this declared even though the production export
      // ships images unoptimized and never consults the loader.
      remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
      ...(isProd && { unoptimized: true }),
    },
    // In production (GitHub Pages, no server) we statically export under the
    // /my-portfolio sub-path. In local dev we skip export so the Next.js dev
    // server provides live image optimization.
    ...(isProd && {
      output: "export",
      basePath,
      assetPrefix: `${basePath}/`,
    }),
  };

export default nextConfig;