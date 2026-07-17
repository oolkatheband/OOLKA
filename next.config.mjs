/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Forces static HTML export required for GitHub Pages
  basePath: '/OOLKA', // Configures asset paths to match your GitHub repository name
  
  typescript: {
    ignoreBuildErrors: true, // Prevents custom types from stalling out build runners
  },
  
  images: {
    unoptimized: true, // Prevents dynamic server image generation overhead on GitHub Pages
  },

  // Retains original header functionality for local development/server mode 
  // without breaking the static build compilation
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
          ],
        },
      ]
    }
    return [];
  },
}

export default nextConfig
