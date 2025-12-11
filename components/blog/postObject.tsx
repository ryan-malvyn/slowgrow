import Link from "next/link";

interface PostObjectProps {
  postData: {
    category: string;
    description: string;
    mainImage: string;
    publishedAt: string;
    sections: string[];
    slug: { current: string };
    title: string;
  };
}

const PostObject = ({ postData }: PostObjectProps) => {
  const { category, description, publishedAt, sections, slug, title } =
    postData;
  const categoryTags = {
    DEV: { color: "bg-blue-300 text-blue-800", tag: "Tech" },
    CREATIVE: { color: "bg-orange-300 text-orange-800", tag: "Creative" },
    FITNESS: { color: "bg-green-300 text-green-800", tag: "Fitness" },
    LIFE: { color: "bg-red-300 text-red-800", tag: "Personal & Life" },
  };
  const categoryLabel = category.toUpperCase();
  const labelContents =
    categoryTags[categoryLabel as keyof typeof categoryTags]?.tag || "GENERAL";
  const labelColor =
    categoryTags[categoryLabel as keyof typeof categoryTags]?.color ||
    "bg-gray-300 text-gray-500";
  const date = new Date(publishedAt).toLocaleDateString();

  const readingDuration =
    sections && sections.length > 0 ? Math.ceil(sections.length * 2) : 5;

  return (
    <article className="mb-10 p-4 pr-0 md:p-0">
      <p
        className={`${labelColor} px-2 py-0 rounded-full text-xs w-min text-nowrap mb-2`}
      >
        {labelContents}
      </p>
      <section className="flex pl-0.5 flex-col gap-2">
        <Link href={`/${slug.current}`}>
          <h2 className="font-serif mb-1 font-semibold text-2xl hover:underline underline-offset-4">
            {title}
          </h2>
          <p className="font-light leading-4.5 text-sm text-slate-400 mb-2 text-left">
            {description}
          </p>
          <div className="flex font-light text-slate-500 justify-between grow mt-2">
            <p>{date}</p>
            <p className="md:w-3/5 text-nowrap">
              {`${readingDuration} min read`}
            </p>
          </div>
        </Link>
      </section>
    </article>
  );
};

export default PostObject;
