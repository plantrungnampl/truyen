/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.assets.so',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'uploads.mangadex.org',
                port: '',
                pathname: '/**',
            }
        ],
    },

    experimental: {
        staleTimes: {
            dynamic: 30,
            static: 180
        },
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
};

export default nextConfig;
