import BlogCard from "../Components/BlogCard"
import Appbar from "../Components/Appbar"
import { useBlogs } from "../hooks"
import Loader from "../Components/Loader"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import New from "../Components/New"
import change from "../utils/dc.ts"
import userAtom from "../recoil/atoms/userAtom.ts"
import blogAtom from "../recoil/atoms/blogAtom.ts"
import { useSetRecoilState } from "recoil"


function Blogs() {
    const navigate = useNavigate()
    const { loading, blogs } = useBlogs()
    const setUser = useSetRecoilState(userAtom)
    const setBlog = useSetRecoilState(blogAtom)

    const getuser = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            const reponse = await axios.get(import.meta.env.VITE_BACKEND_URL + '/user/get-user', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (reponse.data.message) {
                setUser({ name: reponse.data.name, id: reponse.data.id })
            } else {
                navigate('/signin')
            }
        }
        else {
            navigate('/signin')
        }
    }

    useEffect(() => {
        getuser()
    }, [])

    if (loading) {
        return <div>
            <Loader />
        </div>
    }
    return (
        <div>
            <div className="">
                <Appbar />
                <div className="flex justify-center sm:mb-2 ">
                    <div>
                        {blogs.length !== 0 ? blogs.map(blog =>
                            <BlogCard
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                date={change(blog.createdAt, true)}
                                key={blog.id}
                                onRead={() => {
                                    setBlog({
                                        id: blog.id,
                                        title: blog.title,
                                        content: blog.content,
                                    })
                                    navigate(`/blog/${blog.id}`)
                                }}
                            />
                        ) :
                            <div className="flex justify-center h-[85vh] items-center text-2xl font-semibold">
                                No Blogs to Show
                            </div>}
                    </div>
                </div>
            </div>
            <New />
        </div>
    )
}

export default Blogs