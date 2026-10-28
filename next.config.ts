import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Flat HTML. No server runtime, so it drops onto Netlify, GitHub Pages,
  // Cloudflare Pages or a plain folder.
  output: "export",
  // Each route becomes <route>/index.html, which is what lets the built
  // folder also be opened straight from disk.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
