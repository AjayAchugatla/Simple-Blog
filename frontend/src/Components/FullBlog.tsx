import { Blog } from "../hooks"
import Appbar from "./Appbar"
import Avatar from "./Avatar"
import change from "../utils/dc.ts"
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

function FullBlog({ blog }: { blog: Blog }) {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-lg sm:gap-12 gap-6">
                    <div className="sm:col-span-8 col-span-12">
                        <div className="text-5xl font-extrabold flex">
                            {blog.title}
                            <Link to={'/edit'} className="text-3xl relative left-60 top-4">
                                <CiEdit className="text-black" />
                            </Link>
                        </div>
                        <div className="text-slate-300 pt-2">
                            {change(blog.createdAt, false)}
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="sm:col-span-4 col-span-12">
                        <div className="text-slate-600 text-lg">
                            Author:
                        </div>
                        <div className="flex gap-2">
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
            </div>
        </div>
    )
}

export default FullBlog