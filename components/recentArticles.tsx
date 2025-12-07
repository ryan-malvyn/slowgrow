import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";

const SideBar = async () => {
    const recentReadsQuery = `*[_type == "recentReads"] | order(_createdAt desc){
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

    if (!recentReads) {
        return <div className="text-center">No recent reads found.</div>;
    }

    console.log(recentReads);

    return (
        <article className="w-full p-4 border-2">
            This should be the sidebar
        </article>
    );
};

export default SideBar;
