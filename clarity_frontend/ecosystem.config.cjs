// pm2: `npm run build && pm2 start ecosystem.config.cjs`
// (the old file was ESM `export const apps`, which pm2 cannot load)
module.exports = {
  apps: [
    {
      name: "clarity_frontend",
      script: "./.output/server/index.mjs",
      exec_mode: "cluster",
      instances: "max",
      env: { PORT: "3000" },
    },
  ],
};
