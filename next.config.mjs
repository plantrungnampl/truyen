/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config, { isServer }) => {
    //     if (isServer) {
    //         config.externals.push('@prisma/client')
    //     }
    //     return config
    // },

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
            },
            {
                protocol: 'https',
                hostname: "cmdxd98sb0x3yprd.mangadex.network",
                port: '',
                pathname: '/**',
            }
        ],
    },

    // experimental: {

    serverExternalPackages: ["@node-rs/argon2"]
    // },
};

export default nextConfig;
