# Additional Setup

Lorga UI are often used at the beginning of a new project. And this documentation serves as a central contact point of all frontends. Therefore it makes sense to add different setup guides, that explain how the get best developer experience with frontend projects. In conjunction the following guides explain how to best setup Vue3 with Typescript and ESLint support. And how to setup VSCode.

## VSCode Setup

In total you need four plugins. The first one is `Headwind` which puts TailwindCSS classes in the right order. The next one is `Vue Language Features (Volar)` with `Typescript Vue Plugin (Volar)`. Those two help with type-checking, renaming and all that good stuff. The last on is `ESLint`, which integrates ESLint to lint your code.

You can put all those plugins into the `.vscode/extensions.json` file. Afterwards VSCode will probably ask, if you want to install those plugins and you can just it yes. That happens to everybody when they open the project and don't have all of those plugins installed. Therefore you want to check this file into version control.

```json

{
  "recommendations": [
    "johnsoncodehk.volar", 
    "johnsoncodehk.vscode-typescript-vue-plugin", 
    "dbaeumer.vscode-eslint", 
    "heybourn.headwind"
  ]
}

```

## TSConfig Setup

You can probably change a lot within the `tsconfig.json` file and still everything works fine. However, the following config is a minimal config that gets the job done. The important thing is `"strict": true`, which enables type checking behavior. With that setting everything that doesn't make sense for Typescript will be red.

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": [
      "vite/client"
    ]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"],
}
```

All possible options are listed here: [https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig).

## ESLint Setup

Now comes the most daunting task, which is setting up ESLint. There are a whole lot of guides out there that tell you to install packages that are not meant for normal projects, for example `@vue/eslint-config-typescript`. 

The following setup is the most simple, that still works. The goal is basically to install the least amount of packages and still get a quite good linting experience that is adapted for Typescript and Vue3. All the docs are linked withing the config file and those docs are also the way how this config was setup. It wasn't setup following a guide but by reading the docs of the ESLint plugins and adding them step by step.

Now, to setup ESLint make sure that you have followed the VSCode setup and install the following packages. If you have `lorga-ui` installed you do not need to install the following packages, because they are included. But this might change in the future, so you might just install them anyway.

Everything ESLint related:
``` bash
npm install eslint
```

Everything Typescript related:
``` bash
npm install @typescript-eslint/eslint-plugin
```

Everything Vue3 related:
``` bash
npm install eslint-plugin-vue
```

Everything Prettier related:
``` bash
npm install eslint-config-prettier eslint-plugin-prettier
```

Setup the file `.eslintrc.js` and paste the following content into it. The rules are opinionated you can change them if you want. But you need to keep the error state behind `prettier/prettier` otherwise it will not format your code. 

``` js
module.exports = {
  root: true,
  env: {
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    browser: true,
    es2021: true,
    node: true,
    // https://eslint.vuejs.org/user-guide/#faq
    "vue/setup-compiler-macros": true,
  },
  extends: [
    // https://eslint.org/docs/user-guide/getting-started#configuration
    "eslint:recommended",
    // https://typescript-eslint.io/docs/linting/#configuration
    "plugin:@typescript-eslint/recommended",
    // https://eslint.vuejs.org/user-guide/#usage
    "plugin:vue/vue3-recommended",
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration or https://github.com/prettier/eslint-config-prettier#installation
    "prettier",
  ],
  // https://github.com/vuejs/vue-eslint-parser#-usage
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: [
    // https://github.com/prettier/eslint-plugin-prettier#installation
    "prettier",
  ],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "vue/no-reserved-component-names": "off",
    "vue/no-unused-components": "warn",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        ignores: [],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
        semi: true,
        htmlWhitespaceSensitivity: "ignore",
        endOfLine: "auto",
        printWidth: 80,
      },
    ],
  },
};
```