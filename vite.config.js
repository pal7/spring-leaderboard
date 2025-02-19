import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`, // Automatically inject React in JSX files
  },
  plugins: [react()],
});
