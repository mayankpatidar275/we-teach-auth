/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"]; // to solve the issue of bcrypt with nextjs
    return config;
  },
};

export default nextConfig;
