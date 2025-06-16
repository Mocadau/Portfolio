# Maurice Cadau - Portfolio

> Interactive Design Portfolio showcasing projects in UX/UI, Data Visualization, and Strategic Design

## 🎯 About

Hi, I'm Maurice – a 23-year-old interaction designer from Aalen, Germany, currently in my 4th semester studying Interaction Design at HfG Schwäbisch Gmünd. My portfolio showcases my passion for pushing creative boundaries and exploring new possibilities in design.

## 🚀 Featured Projects

- **PerForm** - Fitness app focusing on proper exercise execution
- **Global Migrants** - Data visualization of worldwide migration patterns
- **Alignspace** - Coworking space booking platform

## 🛠 Tech Stack

- **Frontend**: Svelte + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Features

- Responsive design optimized for all devices
- Interactive polaroid camera interface
- Smooth scroll-based navigation
- Walking figure animation system
- Email integration with copy functionality

## 🎨 Design Philosophy

I believe great design comes from understanding people, challenging assumptions, and embracing failure as a learning opportunity. Every project is a chance to create something meaningful that pushes the boundaries of what's possible.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `allowJs` in the TS template?**

While `allowJs: false` would indeed prevent the use of `.js` files in the project, it does not prevent the use of JavaScript syntax in `.svelte` files. In addition, it would force `checkJs: false`, bringing the worst of both worlds: not being able to guarantee the entire codebase is TypeScript, and also having worse typechecking for the existing JavaScript. In addition, there are valid use cases in which a mixed codebase may be relevant.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
