# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Interactive timeline for work experience
- Project showcase with GitHub links
- Contact form
- Awards and activities section

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
```

2. Navigate to the project directory
```bash
cd portfolio-website
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## Deployment

This website is designed to be easily deployed to GitHub Pages:

1. Update the `vite.config.ts` file to include your repository name:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // other config options...
})
```

2. Build the project:

```bash
npm run build
# or
yarn build
```

3. Deploy to GitHub Pages:

```bash
npm run deploy
# or
yarn deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.