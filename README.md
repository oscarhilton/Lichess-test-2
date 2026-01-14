# Lichess-test-2

A Next.js chess learning application for studying chess strategies and tactics.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Vercel Deployment Configuration

This project is configured for deployment on Vercel with the following settings:

### Configuration Files

#### `vercel.json`

The `vercel.json` file configures Vercel's build and deployment settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

- **buildCommand**: Specifies the command to build the Next.js application
- **outputDirectory**: Points to `.next`, which is the default build output for Next.js applications
- **framework**: Explicitly declares this as a Next.js project for optimized deployment

#### `next.config.js`

The Next.js configuration includes the `standalone` output mode for Vercel's serverless deployment:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

- **output: 'standalone'**: Generates a minimal standalone build that includes only the necessary files for deployment, optimizing for serverless environments like Vercel

### Project Structure

```
.
├── app/                  # Next.js App Router directory
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── public/              # Static assets directory (required by Vercel)
├── next.config.js       # Next.js configuration
├── vercel.json          # Vercel deployment configuration
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

### Vercel Dashboard Settings

When deploying on Vercel, ensure these settings in your project configuration:

1. **Framework Preset**: Next.js
2. **Build Command**: `npm run build` (or leave default)
3. **Output Directory**: `.next` (or leave default)
4. **Install Command**: `npm install` (or leave default)

### Why These Configurations Are Important

1. **Output Directory (`.next`)**: Next.js builds to the `.next` directory by default. Vercel needs to know where to find the built files.

2. **Standalone Output Mode**: The `output: 'standalone'` setting in `next.config.js` creates a minimal production build that:
   - Includes only necessary dependencies
   - Reduces deployment size
   - Optimizes for serverless environments
   - Works seamlessly with Vercel's infrastructure

3. **Public Directory**: The `public` directory is required for serving static assets (images, fonts, etc.) at the root path. Even if initially empty, it should exist to prevent build errors.

### Troubleshooting

If you encounter build issues on Vercel:

1. Verify `vercel.json` is present and correctly configured
2. Ensure `next.config.js` includes `output: 'standalone'`
3. Confirm the `public` directory exists (even if empty)
4. Check that `package.json` has all required dependencies
5. Review Vercel build logs for specific error messages

### Contributing

When making changes to the project, remember to:

- Keep the Vercel configuration files up to date
- Test builds locally before deploying
- Document any new deployment requirements

## License

MIT