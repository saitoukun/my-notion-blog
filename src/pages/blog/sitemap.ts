import { post } from '../../types/post'
import { getDateStr } from '../../lib/blog-helpers'
import { getPosts } from '../../lib/notion/getPosts'
import { GetServerSideProps } from 'next'

const generateSitemap = (posts: post[], location: string): string => {
  let latestPost: number = 0;
  let xml: string = "";

  posts.map(post => {
    const postDate: string = getDateStr(post.date);
    const projectURL = location + post.slug;
    if (post.date > latestPost) {
      latestPost = post.date;
    }

    xml += `<url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xml}
    </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res } ) => {
  const location = "https://yoppe.now.sh/blog/"
  const posts = await getPosts()
  const sitemap: string = generateSitemap(posts, location)
  res.setHeader('content-type', 'application/xml');
  res.write(sitemap);
  res.end();

  return { props: {} }
}

const sitemap = () => null
export default sitemap
