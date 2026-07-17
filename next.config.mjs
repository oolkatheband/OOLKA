/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/OOLKA',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
  },
}

// When building on GitHub Actions via your new package.json script flag, force static output mode
if (process.env.NEXT_PUBLIC_EXPORT_MODE === 'true') {
  nextConfig.output = 'export';
} else {
  // Keeps full cross-origin security headers completely intact for FFMPEG local performance testing
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
