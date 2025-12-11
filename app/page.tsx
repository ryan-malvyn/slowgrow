import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";
import PostObject from "../components/blog/postObject";
import SideBar from "@/components/recentArticles";

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
  const posts = await client.fetch<BlogPost[]>(POSTS_QUERY, {}, options);
  return (
    <main className="container p-4">
      <div className="flex justify-between">
        <h3 className="mb-10 text-sm font-sans text-slate-400 ml-4 md:ml-0">
          @ryanmalvyn
        </h3>
        <ul className="text-sm flex gap-4 text-slate-400">
          <li className="hover:pointer">About</li>
          <li className="hover:pointer">Works</li>
        </ul>
      </div>
      <div className="mb-8 border-red-400">
        <h1 className="text-5xl font-bold font-serif ml-4 md:ml-0">Stories</h1>
      </div>
      <div className="flex justify-evenly mt-4">
        <ul className="flex flex-col gap-y-4 md:max-w-5/7 p-4 pl-0">
          {posts.map((post: BlogPost) => (
            <PostObject key={post._id} postData={post} />
          ))}
        </ul>
        <ul className="flex-col hidden md:flex gap-y-4 md:max-w-2/7 ml-6 py-4 grow text-right text-pretty">
          <SideBar />
        </ul>
      </div>
    </main>
  );
}
