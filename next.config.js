/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.4cdn.org',
        port: '',
        pathname: '**'
      }
    ]
  }
}

module.exports = nextConfig
