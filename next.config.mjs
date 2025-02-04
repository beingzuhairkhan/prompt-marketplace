/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixner.net', // Allow images from pixner.net
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Add Unsplash
      },
    ],
    domains: ['res.cloudinary.com'], // Allow images from Cloudinary
  },
  experimental: {
    reactRefresh: false, // Disable React Fast Refresh if needed (usually for custom configurations)
  },
};

export default nextConfig;
