import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: false,
    images: {
        domains: ["picsum.photos", "inmove-blog.oss-cn-hangzhou.aliyuncs.com"],
    },
};

export default nextConfig;
