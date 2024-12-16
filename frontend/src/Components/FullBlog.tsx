import { Blog } from "../hooks"
import Appbar from "./Appbar"
import Avatar from "./Avatar"
import change from "../utils/dc.ts"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userAtom from "../recoil/atoms/userAtom.ts";
import { useRecoilValue } from "recoil";
import Modal from 'react-modal';
import { useState } from "react";
import axios from "axios";
import Editor from "./TextEditor.tsx";


function FullBlog({ blog }: { blog: Blog }) {
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom)

    if (user.id === "") {
        navigate('/signin')
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function deleteBlog() {
        try {
            const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/blog/${blog.id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data.success) {
                navigate('/')
            } else {
                console.log(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center relative">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-lg sm:gap-12 gap-6">
                    <div className="sm:col-span-8 col-span-12">
                        <div className="text-[2.5rem] font-extrabold flex justify-between">
                            {blog.title}
                            <div className="flex gap-2 pr-6">
                                {user.id === blog.author.id ?
                                    <Link to={'/edit'} className="text-4xl relative top-4 left-5">
                                        <CiEdit className="text-slate-400 hover:text-black" />
                                    </Link> : null}
                                {user.id === blog.author.id ?
                                    <MdDelete className="text-slate-400 hover:text-red-500 cursor-pointer text-4xl relative top-[15px] left-5"
                                        onClick={openModal}
                                    />
                                    : null}
                            </div>
                        </div>
                        <div className="text-slate-300 pt-2">
                            {change(blog.createdAt, false)}
                        </div>
                        <div className="-ml-4 absolute sm:relative top-64 sm:top-0">
                            <Editor content={blog.content} readOnly={true} />
                        </div>
                    </div>
                    <div className="sm:col-span-4 col-span-12 sm:relative absolute sm:top-0 top-40">
                        <div className="flex gap-1">
                            <div className="flex justify-center flex-col">
                                <Avatar name={blog.author.name} size="big" />
                            </div>
                            <div>
                                <div className="text-xl mt-5 font-bold">
                                    {blog.author.name}
                                </div>
                                <div className=" text-slate-500">
                                    {blog.author.bio}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Delete Confirmation"
                    className="bg-white p-6 rounded-lg shadow-lg w-96"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <h2 className="text-xl font-semibold text-center mb-4">
                        Are you sure you want to delete this blog?
                    </h2>
                    <div className="flex justify-between">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            onClick={deleteBlog}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>

            </div>
        </div>
    )
}

export default FullBlog