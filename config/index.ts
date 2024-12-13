import { Config, Environments } from "@/types/api";

const env: Environments = "local";

const environments: Record<Environments, Config> = {
  local: {
    api: "http://192.168.1.33:3000",
  },
};

const config: Config = environments[env];

export default config;
