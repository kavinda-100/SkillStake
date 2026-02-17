import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Turbopack configuration for Next.js 16
    // Turbopack has better file watching for Docker by default
    turbopack: {},
};

export default nextConfig;
