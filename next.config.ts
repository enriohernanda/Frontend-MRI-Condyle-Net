import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  "rules": {
  "@typescript-eslint/no-unused-vars": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "react-hooks/exhaustive-deps": "off"
}

};

export default nextConfig;
