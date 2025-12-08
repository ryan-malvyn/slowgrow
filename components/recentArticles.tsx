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
        <ul className="w-full p-2 border-2">
            {recentReads.length > 0 &&
                recentReads.map((article) => {
                    return (
                        <div key={article._id}>
                            <Link href={article.url}>
                                <h4 className="text-xl font-semibold text-left">
                                    {article.title}
                                </h4>
                            </Link>
                        </div>
                    );
                })}
        </ul>
    );
};

export default SideBar;
