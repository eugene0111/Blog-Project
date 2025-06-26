import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"

export type Blog = {
    id: string;
    title: string;
    content: string;
    author: {name: string};
}

export const Blogs = () => {
    const {loading, blogs} = useBlogs() as { loading: boolean, blogs: Blog[] };

    if (loading) {
        return <div>
            <Appbar />
            Loading...
        </div>
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="w-screen max-w-3xl">
                    {blogs.map(blog => (
                        <BlogCard 
                            id={Number(blog.id)}
                            title={blog.title} 
                            authorName={blog.author.name}
                            content={blog.content}
                            publishedDate="13th Jan"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
