/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
          esModuleInterop: true,
          resolveJsonModule: true,
          strict: true,
          paths: {
            "@/*": ["./src/*"],
          },
          baseUrl: ".",
        },
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^leaflet$": "<rootDir>/__mocks__/leaflet.ts",
    "^leaflet/dist/leaflet\\.css$": "identity-obj-proxy",
    "^react-leaflet$": "<rootDir>/__mocks__/react-leaflet.tsx",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/layout.tsx",
    "!src/app/globals.css",
    "!src/app/page.tsx",
    "!src/app/area/*/page.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

module.exports = config;
