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
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  const sections = post.sections || [];
  console.log(sections);

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
        </div>

        {sections.length > 0 && (
          <article className="prose prose-lg max-w-4/5">
            {sections.map((section: any, index: number) => (
              <section
                key={index}
                id={`section-${index}`}
                className="mb-8 text-slate-200"
              >
                {section.title && (
                  <h2 className="text-2xl text-white font-semibold mb-2">
                    {section.title}
                  </h2>
                )}
                {section.content && <PortableText value={section.content} />}
              </section>
            ))}
          </article>
        )}
      </main>

      {sections.length > 0 && (
        <aside className="p-2 mt-40 hidden md:block">
          <nav className="sticky top-40 text-right">
            <h3 className="font-semibold mb-4 text-sm uppercase text-gray-600">
              Contents
            </h3>
            <ul className="space-y-2">
              {sections.map((section: any, index: number) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="text-sm hover:underline text-gray-700 hover:text-gray-900"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </main>
  );
}
