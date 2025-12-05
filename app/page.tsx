import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";
import PostObject from "../components/blog/postObject"

const POSTS_QUERY = `*[
  _type == "blogPost" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  category,
  description,
  mainImage,
  sections
}`;

const options = { next: { revalidate: 30 } };
export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const today = new Date();
  const todayDate = today.toLocaleDateString();
  const currentTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log(posts)
  return (
    <main className="container max-w-3/5 mx-auto mt-20 min-h-screen md:pl-0">
      <h3 className="mb-10 text-sm font-sans text-slate-400">@ryanmalvyn</h3>
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif mb-2">Stories</h1>
        <div className="flex justify-between max-w-3/4 text-slate-400 text-sm font-sans md:w-1/2">
          <p>
            {todayDate}
          </p>
          <p>
            {currentTime}
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <PostObject key={post._id} postData={post} />
        ))}
      </ul>
    </main>
  );
}