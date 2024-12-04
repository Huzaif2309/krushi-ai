module.exports = {
  async rewrites() {
      return [
          {
              source: "/api/:path*",
              destination: "https://65hqhf12-5000.inc1.devtunnels.ms/:path*", // Proxy to the API
          },
      ];
  },
};