# InstaReady

**Add clean borders to match Instagram ratios, instantly.**

InstaReady is a browser-based image framing tool. Upload one or more photos, choose an Instagram aspect ratio, and the app will resize and pad each image with a border so it displays perfectly — no cropping, no distortion.

## Features

- **Drag & drop upload** — accepts PNG, JPG, and WEBP files
- **Aspect ratio presets** — Portrait / Post (4:5), Story (9:16), and Square (1:1)
- **Border color picker** — choose any color for the padding area
- **Optimize Image Size** — when enabled, output dimensions match the official Instagram resolution for the chosen preset; when disabled, the image keeps its native resolution and only the minimum border is added
- **Batch download** — single images are saved directly; multiple images are bundled into a `.zip` file

## Running locally

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run build`    | Production build               |
| `npm run start`    | Start the production server    |
| `npm test`         | Run the test suite             |
| `npm run lint`     | Lint the codebase              |
| `npm run prettier` | Format all files with Prettier |
