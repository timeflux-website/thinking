import fs from 'node:fs';
import path from 'node:path';

const siteUrl = 'https://thinkingalongsidemachines.com';
const distDir = path.join(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

const routes = {
  '/': {
    title: 'Thinking Alongside Machines | Ovidiu Dulăcioiu',
    description:
      'Ovidiu Dulăcioiu personal website: practical AI, human agency, Thinking Alongside Machines, the YouTube channel, and TIMEFLUX.',
    type: 'website',
  },
  '/book': {
    title: 'Thinking Alongside Machines Book | AI, Agency, and Control',
    description:
      'Thinking Alongside Machines by Ovidiu Dulăcioiu explores practical AI, decision-making, system design, human agency, risk, value, and control beyond hype and fear.',
    type: 'article',
    schemaType: 'Book',
  },
  '/youtube': {
    title: 'Thinking Alongside Machines YouTube Channel | Practical AI Beyond the Noise',
    description:
      'The Thinking Alongside Machines YouTube channel makes sense of AI beyond hype and fear, with grounded reflections on how AI systems behave and where human judgement matters.',
    type: 'article',
  },
  '/timeflux': {
    title: 'TIMEFLUX | Practical Human-in-the-loop AI for Legal Work',
    description:
      'TIMEFLUX is Ovidiu Dulăcioiu’s AI-enabled legal technology app for time tracking, fee and task management, planning, reporting, and case-to-invoice workflows.',
    type: 'article',
    schemaType: 'SoftwareApplication',
  },
  '/contact': {
    title: 'Contact Ovidiu Dulăcioiu | Thinking Alongside Machines',
    description:
      'Contact Ovidiu Dulăcioiu and find links to LinkedIn, X, the Amazon author page, Thinking Alongside Machines, practical AI work, and TIMEFLUX.',
    type: 'article',
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function canonicalUrl(route) {
  return route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function person() {
  return {
    '@type': 'Person',
    name: 'Ovidiu Dulăcioiu',
    alternateName: 'Ovidiu Dulacioiu',
    url: siteUrl,
    sameAs: [
      'https://www.linkedin.com/in/ovidiu-dulacioiu/',
      'https://x.com/ovi_timeflux',
      'https://www.amazon.co.uk/stores/author/B0D2WG7RZ7',
      'https://www.youtube.com/@ThinkingAlongsideMachines',
      'https://timeflux.co.uk/',
    ],
  };
}

function structuredData(route, metadata) {
  const url = canonicalUrl(route);
  const author = person();

  if (metadata.schemaType === 'Book') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Thinking Alongside Machines: AI, Agency, and the Limits of Control',
      description: metadata.description,
      author,
      isbn: '979-8253847596',
      inLanguage: 'en',
      datePublished: '2026-04-12',
      url,
    };
  }

  if (metadata.schemaType === 'SoftwareApplication') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TIMEFLUX',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: metadata.description,
      url: 'https://timeflux.co.uk/',
      creator: author,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': route === '/' ? 'WebSite' : 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url,
    author,
  };
}

function metadataHead(route, metadata) {
  const url = canonicalUrl(route);
  return `<title>${escapeHtml(metadata.title)}</title>
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="author" content="Ovidiu Dulăcioiu" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />
    <meta property="og:site_name" content="Thinking Alongside Machines" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:type" content="${metadata.type}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <script id="structured-data" type="application/ld+json">${JSON.stringify(
      structuredData(route, metadata)
    )}</script>`;
}

function withMetadata(template, route, metadata) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s+name="description"[\s\S]*?>/i, '')
    .replace(/<meta\s+name="author"[\s\S]*?>/i, '')
    .replace(/<meta\s+name="robots"[\s\S]*?>/i, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?>/i, '')
    .replace(/<meta\s+property="og:[\s\S]*?>/gi, '')
    .replace(/<meta\s+name="twitter:[\s\S]*?>/gi, '')
    .replace(/<script id="structured-data"[\s\S]*?<\/script>/i, '')
    .replace('</head>', `${metadataHead(route, metadata)}\n  </head>`);
}

function writeRoute(route, html) {
  if (route === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
    return;
  }

  const routeDir = path.join(distDir, route.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
}

if (!fs.existsSync(templatePath)) {
  process.exit(0);
}

const template = fs.readFileSync(templatePath, 'utf8');

Object.entries(routes).forEach(([route, metadata]) => {
  writeRoute(route, withMetadata(template, route, metadata));
});

fs.writeFileSync(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(routes)
  .map((route) => `  <url><loc>${canonicalUrl(route)}</loc></url>`)
  .join('\n')}
</urlset>
`
);
