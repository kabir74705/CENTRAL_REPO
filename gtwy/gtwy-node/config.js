// gtwy-node — project config
// Used by walkover-onboard CLI to clone the repo and set up the environment.

export default {
  repoUrl: "https://github.com/Walkover-Web-Solution/gtwy-node",

  envs: {
    PORT: "",
    MONGO_URI: "",
    POSTGRES_URI: "",
    TIMESCALE_URI: "",
    REDIS_URL: "",
    JWT_SECRET: "",
    OPENAI_API_KEY: "",
    ATATUS_API_KEY: "",
    RABBITMQ_URL: "",
    SERVICE_VERSION: "v1.4",
    SHUTDOWN_TIMEOUT_MS: "30000",
    NODE_ENV: "development",
  },
};
