import Appbar from "../Components/Appbar"
import axios from "axios"
import { useState } from "react"
import Error from "../Components/Error";
import { useNavigate } from "react-router-dom";
import blogAtom from "../recoil/atoms/blogAtom";
import { useSetRecoilState } from "recoil";

function Publish() {
    const [error, setError] = useState("")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const setBlog = useSetRecoilState(blogAtom)
    const navigate = useNavigate()
    const submit = async () => {
        if (title === "") {
            setError("Enter the title");
            return;
        } else if (content === "") {
            setError("Enter the content");
            return;
        }
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/blog", {
                title,
                content
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data.id) {
                navigate(`/blog/${response.data.id}`)
                setBlog(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center mt-10">
                <div className="max-w-screen-sm w-full mx-2">

                    <input type="text" className="block w-full  px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none leading-relaxed " placeholder="Title" required onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="block w-full  h-60 px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none leading-relaxed resize-none mt-3 mb-2" placeholder="Enter content..." onChange={(e) => setContent(e.target.value)}></textarea>
                    <Error text={error} />
                    <div className="mt-2 flex justify-center">
                        <button onClick={submit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-40">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Publish