import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import type { Blog } from "../pages/Blogs";

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | undefined>(undefined);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
        }).then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            });
    }, [])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`
            }
        }).then(response => {
                setBlogs(response.data);
                setLoading(false);
            });
    }, [])

    return {
        loading,
        blogs
    }
}