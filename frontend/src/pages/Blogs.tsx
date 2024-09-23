import BlogCard from "../Components/BlogCard"
import Appbar from "../Components/Appbar"
import { useBlogs } from "../hooks"
import Loader from "../Components/Loader"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import New from "../Components/New"
import change from "../utils/dc.ts"

function Blogs() {
    const navigate = useNavigate()
    const { loading, blogs } = useBlogs()


    const getuser = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            const reponse = await axios.get(import.meta.env.VITE_BACKEND_URL + '/user/get-user', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (reponse.data.message) {

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