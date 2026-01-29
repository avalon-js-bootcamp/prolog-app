module.exports = {
  "*.{js,jsx,ts,tsx}": "biome check --write --unsafe",
  "*.{css,scss}": [
    "stylelint  --ignore-path .gitignore --cache --fix",
    "prettier --ignore-path .gitignore --write",
  ],

  // return a function so that the staged files aren't appended to the command
  // otherwise tsc will ignore the .tsconfig file. From the docs: "When input
  // files are specified on the command line, tsconfig.json files are ignored."
  // https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  "*.{ts,tsx}": () => "npm run check:types",
};
