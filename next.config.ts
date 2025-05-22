import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //add the image src
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "img.clerk.com"],
  },
};

export default nextConfig;
