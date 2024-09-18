// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Set up fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false, // Example for another module that should not be bundled
    };

    // Return the updated configuration
    return config;
  },
};

module.exports = nextConfig;
