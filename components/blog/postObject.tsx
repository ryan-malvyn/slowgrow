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
        'DEV':{color:'bg-blue-300 text-blue-500',tag:'TECH'},
        'CREATIVE':{color:'bg-orange-300 text-orange-500',tag:'CREATIVE'},
        'FITNESS':{color:'bg-green-300 text-green-500',tag:'FITNESS'},
        'LIFE':{color:'bg-red-300 text-red-500',tag:'PERSONAL & LIFE'},
    }

    const categoryLabel = category.toUpperCase();
    const labelContents = categoryTags[categoryLabel as keyof typeof  categoryTags]?.tag || 'GENERAL';
    const labelColor = categoryTags[categoryLabel as keyof typeof  categoryTags]?.color || 'bg-gray-300 text-gray-500';

    return(
        <article className='mb-10'>
            <p className={`${labelColor} px-4 py-0 rounded-full text-sm font-semibold w-min text-nowrap mb-2`}>{labelContents}</p>
            <section className='flex pl-0.5 flex-col'>
                <Link href={`/${slug.current}`}>
                    <h2 className="font-serif font-semibold mb-1 text-2xl underline underline-offset-4">{title}</h2>
                    <p className='font-light text-slate-400 mb-2'>{description}</p>
                    <div className='flex font-light text-slate-500 justify-between w-1/3 mt-2'>
                        <p>
                            12/05/2025
                        </p>
                        <p>
                            6 min read
                        </p>
                    </div>
                </Link>
            </section>
        </article>
    )
}

export default PostObject;