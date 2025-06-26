import { Link } from "react-router-dom"

type BlogCardProps = {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b pb-4 border-slate-200 p-4 cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="flex justify-center flex-col">
                    <div className="text-sm font-extralight pl-2">
                        {authorName}
                    </div>
                </div>
                <div className="flex justify-center flex-col">
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                </div>
                <div className="flex justify-center flex-col">
                    <div className="pl-2 text-sm font-thin text-slate-500">
                        {publishedDate}
                    </div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </div>
            <div className="text-slate-400 text-sm font-thin pt-2">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full">
        <span className="text-xs font-thin text-gray-300">{name[0].toUpperCase()}</span>
    </div>
}