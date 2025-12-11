import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";

const SideBar = async () => {
  const recentReadsQuery = `*[_type == "recentRead"] | order(_createdAt desc){
        _id,
        title,
        author,
        source,
        url,
        coverImage,
        description
        }`;

  const options = { next: { revalidate: 30 } };
  const recentReads = await client.fetch<SanityDocument[]>(
    recentReadsQuery,
    {},
    options,
  );
  console.log(recentReads);

  if (!recentReads) {
    return <div className="text-center">No recent reads found.</div>;
  }

  return (
    <ul className="w-full p-2">
      {recentReads.length > 0 &&
        recentReads.map((article) => {
          return (
            <div key={article._id} className="text-left flex flex-col">
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex justify-between opacity-70 mb-2">
                  <p className="text-xs font-light">{article.author}</p>
                  <p className="text-xs font-light">{article.source}</p>
                </div>
                <h4 className="text-md mb-2 leading-5 font-semibold hover:underline">
                  {article.title}
                </h4>

                <div className="text-xs font-light leading-4">
                  {article.description}
                </div>
              </Link>
              <hr className="opacity-20 my-4" />
            </div>
          );
        })}
    </ul>
  );
};

export default SideBar;
