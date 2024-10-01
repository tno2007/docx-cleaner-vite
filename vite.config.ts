import { defineConfig } from "vite";
import { babel } from "@rollup/plugin-babel";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "docxcleaner",
      fileName: (format) => `docxcleaner.${format}.js`,
    },
    rollupOptions: {
      input: ["src/index.ts"],
      plugins: [
        babel({
          babelHelpers: "bundled",
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["ie >= 10"],
                },
              },
            ],
          ],
        }),
      ],
    },
  },
});
