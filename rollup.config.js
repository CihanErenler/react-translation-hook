import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        exclude: "node_modules/**",
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      }),
    ],
  },
];
