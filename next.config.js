/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['yt3.ggpht.com', 'https://avatars.githubusercontent.com/u/113364751?v=4', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
