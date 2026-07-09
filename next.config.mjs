/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    reactStrictMode: true,
    // In production (GitHub Pages, no server) we statically export with
    // unoptimized images under the /my-portfolio sub-path. In local dev we
    // skip export so the Next.js dev server provides live image optimization.
    ...(isProd && {
      output: "export",
      basePath: "/my-portfolio",
      assetPrefix: "/my-portfolio/",
      images: { unoptimized: true },
    }),
  };

export default nextConfig;