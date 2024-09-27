/* eslint-disable prettier/prettier */
export default {
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "www.bondhugroupbd.com",
          },
        ],
        destination: "https://bondhugroupbd.com/:path*",
        permanent: true,
      },
    ];
  },
};
