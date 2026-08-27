/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static exports if using Next.js Image components
  },
};

export default nextConfig;