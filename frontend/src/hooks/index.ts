import { useEffect, useState } from "react"
import axios from "axios"

export type Blog = {
    "content": string,
    "title": string,
    "id": string,
    "createdAt": "string",
    "author": {
        "id": string;
        "name": string,
        "bio": string,
    },
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const getBlogs = async () => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/blog/bulk', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setBlogs(response.data.blogs)
        setLoading(false)
    }

    useEffect(() => {
        getBlogs()
    }, [])

    return { loading, blogs }
}

export const useBlog = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    const getBlog = async () => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        setBlog(response.data.blog)
        setLoading(false)
    }

    useEffect(() => {
        getBlog()
    }, [])

    return { loading, blog }
}

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState<string>();

    const getuser = async () => {
        const token = localStorage.getItem("token")
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/user/get-user', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.data.message) {
            setName(response.data.name)
            setLoading(false)
        }
    }
    useEffect(() => {
        getuser()
    }, [])
    return { loading, name }
}