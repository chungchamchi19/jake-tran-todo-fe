import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};
export default config;