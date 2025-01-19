/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
            },
            {
                hostname: 'public.bnbstatic.com',
            },
        ],
    },
}

export default nextConfig
