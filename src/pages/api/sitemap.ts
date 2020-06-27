import { post } from '../../types/post'
import { getDateStr } from '../../lib/blog-helpers'
import { getPosts } from '../../lib/notion/getPosts'
import { NextApiRequest, NextApiResponse } from 'next';

const generateSitemap = (posts: post[]): string => {
  let latestPost: number = 0;
  let projectsXML: string = "";

  posts.map(post => {
    const postDate: string = getDateStr(post.date);
    if (post.date > latestPost) {
      latestPost = post.date;
    }

    const projectURL = `https://yoppe.now.sh/blog/${post.slug}/`;
    projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://domain.ltd/</loc>
        <lastmod>${getDateStr(latestPost)}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://domain.ltd/about/</loc>
        <priority>0.80</priority>
      </url>
      ${projectsXML}
    </urlset>`;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getPosts()
  const sitemap: string = generateSitemap(posts)
  res.setHeader('content-type', 'application/xml');
  res.write(sitemap);
  res.end();
}