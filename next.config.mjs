/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/OOLKA',
  assetPrefix: '/OOLKA/', // Fixes asset linking templates across static routers
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true, // Tells Next.js to treat assets as standard raw images
  },
}

if (process.env.NEXT_PUBLIC_EXPORT_MODE === 'true') {
  nextConfig.output = 'export';
} else {
  nextConfig.headers = async () => {
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
}

export default nextConfig;
