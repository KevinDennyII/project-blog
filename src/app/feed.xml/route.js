import RSS from "rss"
import {getBlogPostList} from "@/helpers/file-helpers";
import {BLOG_DESCRIPTION, BLOG_TITLE} from "@/constants";
export async function GET() {

  // Create the feed using the RSS helper, and the metadata
  // about our blog.
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    generator: 'RSS for Node and Next.js',
    feed_url: 'https://localhost:3000/feed.xml',
    site_url: 'https://localhost:3000/',
    managingEditor: 'kevin.dennyii@gmail.com (Kevin Denny II)',
    copyright: `Copyright ${new Date().getFullYear().toString()}, Kevin Denny II`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const allPosts = await getBlogPostList();

  // iterate through post list create a list of feeds
  if (allPosts) {
    allPosts.map((post) => {
      feed.item({
        title: post.title,
        description: post.abstract,
        url: `http://localhost:3000/${post.slug}`,
        author: "Kevin Denny II",
        date: post.publishedOn,
      });
    });
  }

  // Generate the raw XML string using `feed.xml`, and then
  // send it to the client. We need to set the Content-Type
  // header so that browsers / RSS clients will interpret
  // it as XML, and not as plaintext.
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
