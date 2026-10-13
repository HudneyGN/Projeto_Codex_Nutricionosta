import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')
const rawSiteUrl = process.env.VITE_SITE_URL || process.env.SITE_URL || ''
const siteUrl = rawSiteUrl.trim().replace(/\/+$/, '')
const sitemapPath = resolve(distDir, 'sitemap.xml')
const indexPath = resolve(distDir, 'index.html')

mkdirSync(distDir, { recursive: true })

const robots = ['User-agent: *', 'Allow: /']

if (siteUrl) {
  robots.push(`Sitemap: ${siteUrl}/sitemap.xml`)
  writeFileSync(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
  )
} else {
  robots.push('# Set VITE_SITE_URL or SITE_URL during build to emit sitemap.xml with absolute URLs.')
  rmSync(sitemapPath, { force: true })
}

writeFileSync(resolve(distDir, 'robots.txt'), `${robots.join('\n')}\n`)

if (siteUrl) {
  const productionHtml = readFileSync(indexPath, 'utf8')
  const seoLinks = `    <link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />`
  writeFileSync(indexPath, productionHtml.replace('  </head>', `${seoLinks}\n  </head>`))
}
