// next.config.mjs — разрешаем изображения из WordPress (чтобы next/image не ругался)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.wordpress.com' },
      { protocol: 'https', hostname: 'mediae1b0014a06-ypkgd.wordpress.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'i1.wp.com' },
      { protocol: 'https', hostname: 'i2.wp.com' },
      // ваш CDN/медиа-домен, если есть:
      // { protocol: 'https', hostname: 'media.prixclub.ru' },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  }
};

export default nextConfig;
