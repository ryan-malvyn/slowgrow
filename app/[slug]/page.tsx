import { PortableText } from "next-sanity";
import { BlogPost } from "@/types/blogPost";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import type { Image } from "sanity";

const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();

/* const ptComponents = {
  block: {

  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value.href} className="text-blue-500 hover:underline">
        {children}
      </a>
  },
} */

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
  const post = await client.fetch<BlogPost>(POST_QUERY, await params, options);
  const publishedDate = new Date(post.publishedAt).toLocaleDateString();
  const sections = post.sections || [];
  console.log(sections);

  return (
    <main className="flex gap-4 justify-center">
      <main className="container min-h-screen p-8 flex flex-col gap-4">
        <article className="prose prose-invert mx-auto max-w-prose px-8">
          <h1 className="mb-2 text-4xl font-serif font-bold text-white">
            {post.title}
          </h1>
          <p className="mb-8 text-sm font-light opacity-60">{publishedDate}</p>

          {sections.length > 0 &&
            sections.map((section, index) => (
              <section key={index} id={`section-${index}`} className="mb-10">
                {section.title && <h2>{section.title}</h2>}
                {section?.content && <PortableText value={section?.content} />}
              </section>
            ))}
        </article>
      </main>

      {sections.length > 0 && (
        <aside className="mt-40 hidden md:block">
          <nav className="sticky top-40 text-left">
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
