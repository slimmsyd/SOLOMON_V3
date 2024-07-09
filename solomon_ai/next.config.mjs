/** @type {import('next').NextConfig} */
const nextConfig = {
    dir: './src', // Correctly specify the base directory for pages and components
    images: {
        domains: ['localhost:3000', 'oaidalleapiprodscus.blob.core.windows.net'], // Replace with your image hosting domain
      },
 
};

export default nextConfig;
