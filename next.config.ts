import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/home',
        permanent: true,
      },
    ]
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
