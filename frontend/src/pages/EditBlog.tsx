import Appbar from "../Components/Appbar"
import axios from "axios"
import { useState } from "react"
import Error from "../Components/Error";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import blogAtom from "../recoil/atoms/blogAtom";

function Update() {
    const blog = useRecoilValue(blogAtom)
    const [error, setError] = useState("")
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const navigate = useNavigate()

    const update = async () => {
        if (title === "") {
            setError("Title Cannot be empty");
            return;
        } else if (content === "") {
            setError("Content Cannot be empty");
            return;
        }
        try {
            const response = await axios.put(import.meta.env.VITE_BACKEND_URL + "/blog", {
                title,
                content,
                id: blog.id,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data.id) {
                console.log("hi");
                navigate(`/blog/${response.data.id}`)
            }
            else
                setError(response.data.error)
        } catch (error) {
            setError("Server Error");
        }
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center mt-10">
                <div className="max-w-screen-sm w-full mx-2">

                    <input type="text"
                        className="block w-full  px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none leading-relaxed "
                        placeholder="Title" required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <textarea
                        className="block w-full  h-60 px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none leading-relaxed resize-none mt-3 mb-2" placeholder="Enter content..."
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                    <Error text={error} />
                    <div className="mt-2 flex justify-center">
                        <button onClick={update} type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-40">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update