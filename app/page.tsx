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
  return (
    <main className="container p-4">
      <div className='flex justify-between'>
        <h3 className="mb-10 text-sm font-sans text-slate-400 ml-4 md:ml-0">@ryanmalvyn</h3>
        Ryan Malvyn
      </div>
      <div className="mb-8border -red-400">
          <h1 className="text-4xl font-bold font-serif mb-2 ml-4 md:ml-0">Stories</h1>
          <div className="flex justify-between text-slate-400 text-sm font-sans md:max-w-4/7 ml-4 md:ml-0">
            <p>
              {todayDate}
            </p>
            <p>
              {currentTime}
            </p>
          </div>
      </div>
      <div className="flex justify-evenly mt-4">
        <ul className="flex flex-col gap-y-4 md:max-w-5/7 p-4 pl-0">
          {posts.map((post) => (
            <PostObject key={post._id} postData={post} />
          ))}
        </ul>
        <ul className="flex-col hidden md:flex gap-y-4 md:max-w-2/7 ml-6 py-4 grow text-right text-pretty">
          This is the sidebar here
        </ul>
      </div>
    </main>
  );
}