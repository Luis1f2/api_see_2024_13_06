module.exports = {
    apps: [
      {
        name: "api-sse",
        script: "index.ts",
        interpreter: "ts-node",
        watch: true,
        env: {
          NODE_ENV: "development",
          PORT: 3000
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 3000
        }
      },
      {
        name: "api-ws",
        script: "indexws.ts",
        interpreter: "ts-node",
        watch: true,
        env: {
          NODE_ENV: "development",
          PORT: 3001
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 3001
        }
      }
    ]
  };
  