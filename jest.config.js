module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true,
    },
  },
  moduleFileExtensions: [
    "ts",
    "js",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: [
    "**/test/**/*.test.(ts|js)",
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: [],
};
