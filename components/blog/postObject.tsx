import Link from "next/link"

interface PostObjectProps {
    postData: {
        category: string,
        description: string,
        mainImage: string,
        publishedAt: string,
        sections: string[],
        slug: {current: string},
        title: string,
    }
}

const PostObject = ({postData}:PostObjectProps) => {
    const {category,description,mainImage,publishedAt,sections,slug,title} = postData;
    const categoryTags = {
        'DEV':{color:'bg-blue-300 text-blue-800',tag:'TECH'},
        'CREATIVE':{color:'bg-orange-300 text-orange-800',tag:'CREATIVE'},
        'FITNESS':{color:'bg-green-300 text-green-800',tag:'FITNESS'},
        'LIFE':{color:'bg-red-300 text-red-800',tag:'PERSONAL & LIFE'},
    }
    const categoryLabel = category.toUpperCase();
    const labelContents = categoryTags[categoryLabel as keyof typeof  categoryTags]?.tag || 'GENERAL';
    const labelColor = categoryTags[categoryLabel as keyof typeof  categoryTags]?.color || 'bg-gray-300 text-gray-500';
    const date = new Date(publishedAt).toLocaleDateString();

    const readingDuration = sections && sections.length > 0 ? Math.ceil(sections.length * 2) : 5;
    console.log(readingDuration)

    return(
        <article className='mb-10 p-4 pr-0 md:p-0'>
            <p className={`${labelColor} px-4 py-0 rounded-full text-sm w-min text-nowrap mb-2`}>{labelContents}</p>
            <section className='flex pl-0.5 flex-col'>
                <Link href={`/${slug.current}`}>
                    <h2 className="font-serif font-semibold mb-1 text-2xl underline underline-offset-4">{title}</h2>
                    <p className='font-light text-slate-400 mb-2 text-left'>{description}</p>
                    <div className='flex font-light text-slate-500 justify-between grow mt-2'>
                        <p>
                            {date}
                        </p>
                        <p className='md:w-3/5 text-nowrap'>
                            {`${readingDuration} min read`}
                        </p>
                    </div>
                </Link>
            </section>
        </article>
    )
}

export default PostObject;