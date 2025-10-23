import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.{glsl,vs,fs,vert,frag}": {
        loaders: ["raw-loader", "glslify"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
