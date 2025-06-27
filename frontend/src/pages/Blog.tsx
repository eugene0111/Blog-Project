import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
import type { Blog } from "./Blogs";
import { Appbar } from "../components/Appbar";

export const Blogg = () => {
    const { id } = useParams() || "";
    if (!id) {
        return <div>
            <Appbar />
            ERROR 404 PAGE NOT FOUND
        </div>
    }
    const { loading, blog } = useBlog({
        id: id
    }) as { loading: boolean, blog: Blog | undefined };

    if (loading) {
        return <div>
            <Appbar />
            Loading...
        </div>
    }

    // @ts-ignore
    return (<div><FullBlog blog={blog} /></div>)
}