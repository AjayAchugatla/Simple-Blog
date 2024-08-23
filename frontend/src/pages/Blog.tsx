import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
import FullBlog from "../Components/FullBlog"
import Loader from "../Components/Loader"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

function Blog() {

    const navigate = useNavigate()
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


    const { id } = useParams()
    const { blog, loading } = useBlog(id || "")
    if (loading || !blog) {
        return <div >
            <Loader />
        </div>
    }
    return (
        <div><FullBlog blog={blog} /></div>
    )
}

export default Blog