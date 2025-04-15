# Quicksy

This is a chrome extension built to copy and save links & group links (as a collection) so that you can context switch easily, intended to use like a workspace.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ or 20+) installed on your machine.

### Setup

1. Clone or fork the repository :

    ```sh
    # To clone
    git clone https://github.com/shreydd/quicksy-chrome.git
    cd quicksy-chrome
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## 📦 Build

Create a production build:

```sh
npm run build
```

This will generate the build files in the `build` directory.

## 📂 Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" using the toggle switch in the top right corner.
3. Click "Load unpacked" and select the `build` directory.

Your React app should now be loaded as a Chrome extension!

## 🗂️ Project Structure

- `public/`: Contains static files and the `manifest.json`.
- `src/`: Contains the React app source code.
- `vite.config.ts`: Vite configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Contains the project dependencies and scripts.

## Credits

- Built using this template: https://github.com/5tigerjelly/chrome-extension-react-template
- Uses shadcn/ui, lucide icons, vite, react.js

## License

This project is licensed under the MIT License.
