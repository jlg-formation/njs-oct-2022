module.exports = {
  apps: [
    {
      name: "gstock",
      script: "./dist/server.js",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      env: {
        GS_PORT: 5000,
      },
    },
  ],
};
