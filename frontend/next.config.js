/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://0.0.0.0:8080/api/v1/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
