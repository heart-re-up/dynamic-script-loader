# @heartreup/script-loader

# How to install.

```shell
# npm
npm i @heartreup/script-loader

# yarn
yarn add @heartreup/script-loader

# pnpm
pnpm add @heartreup/script-loader
```

Load a script synchronously or asynchronously.

# Usages.

Use with callbacks.

```ts
import { loadScriptSync } from "@heartreup/script-loader";

loadScriptSync(
    'https://something.com/something/path/javascript-file.js',
    (el: HTMLScriptElement) => console.log(el),
    (ev: ErrorEvent) => console.error(ev),
);
```

Use with a promise.

```ts
import { loadScript } from "@heartreup/script-loader";

const load = async () => {
    const el = await loadScript('https://something.com/something/path/javascript-file.js');
}
```