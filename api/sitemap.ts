export const config = { runtime: 'edge' };

const SITE_URL =
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://grupoelite.pythonanywhere.com';

interface BlogPost {
  slug: string;
  fecha_creacion: string;
}

export default async function handler() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return new Response('Missing env vars', { status: 500 });
  }

  // Fetch posts
  const postsRes = await fetch(
    `${supabaseUrl}/rest/v1/blog_posts?select=slug,fecha_creacion&order=fecha_creacion.desc`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    }
  );

  const posts: BlogPost[] = postsRes.ok ? await postsRes.json() : [];

  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/suscripcion', priority: '0.8', changefreq: 'monthly' },
  ];

  const urlEntries: string[] = [];

  // Rutas estáticas
  for (const route of staticRoutes) {
    urlEntries.push(`
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
  }

  // Posts del blog
  for (const post of posts) {
    const lastmod = post.fecha_creacion
      ? new Date(post.fecha_creacion).toISOString().split('T')[0]
      : today;
    urlEntries.push(`
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}