/** @type {import('next').NextConfig} */

// Set BASE_PATH only in the job that deploys to a subpath (GitHub Pages serves this
// repo from /Bellwood-Public-Works). Keying off GITHUB_ACTIONS instead would force the
// prefix onto every CI job, including the accessibility audit, which serves out/ at the
// server root.
const basePath = process.env.BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    // Frozen at build time and inlined into both the prerendered HTML and the client
    // bundle, so the two always agree. Reading the clock at render time instead would
    // let the export and the hydration disagree about which meetings are upcoming.
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
};

export default nextConfig;
