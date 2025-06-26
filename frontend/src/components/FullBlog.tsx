import { Appbar } from "./Appbar"
import type { Blog } from "../pages/Blogs"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog : Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold pt-12">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on 2nd December 2023
                    </div>
                    <div className="pt-2">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="pt-12 text-slate-600">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-2 flex flex-col justify-center">
                            <Avatar name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catchphrase about the author's ability to grab the reader's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}