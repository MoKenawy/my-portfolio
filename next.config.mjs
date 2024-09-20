const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  assetPrefix: isProd ? basePath + '/' : '',
  basePath: isProd ? basePath : '',
    output: "export",
    reactStrictMode: true,
  };

export default nextConfig;



