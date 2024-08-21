## Setup

```bash
bun add farm-js-plugin-stylus@latest --save-dev
```
```bash
pnpm add farm-js-plugin-stylus@latest --save-dev
```
```bash
yarn add farm-js-plugin-stylus@latest --save-dev
```
```bash
npm i farm-js-plugin-stylus@latest --save-dev
```


Modify the farm config file:

```diff
import { defineConfig } from "@farmfe/core"
+ import stylusPlugin from 'farm-js-plugin-stylus'

export default defineConfig({
  plugins: [
+   stylusPlugin() 
   ]
})
```
