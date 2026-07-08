// hitman-api — project config
// Used by walkover-onboard CLI to clone the repo and set up the environment.

export default {
  repoUrl: "https://github.com/Walkover-Web-Solution/hitman-api",

  envs: {
    PORT: "",
    DATABASE_URL: "",
    REDIS_URL: "",
    TOKEN_SECRET_KEY: "",
    CLOUDFLARE_API_KEY: "",
    CLOUDFLARE_ZONE_ID: "",
    SLACK_WEBHOOK_URL: "",
    NODE_ENV: "development",
  },
};
