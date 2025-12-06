import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import type { Image } from "sanity";

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: Image) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;
  post.sections.map((section)=>{
    
  })
  return (
    <main className="flex gap-4 justify-center">
      <main className="container min-h-screen max-w-3xl p-8 pr-0 flex flex-col gap-4">
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-4xl font-bold mb-8 font-serif">{post.title}</h1>
        <div className="prose">
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
    </main>
      <section className='p-2 mt-40 hidden md:flex text-right'>
        This is the chapters navigation section
      </section>
    </main>
  );
}