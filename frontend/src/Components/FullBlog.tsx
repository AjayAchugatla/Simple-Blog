import { Blog } from "../hooks"
import Appbar from "./Appbar"
import Avatar from "./Avatar"

function FullBlog({ blog }: { blog: Blog }) {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-lg sm:gap-12 gap-6">
                    <div className="sm:col-span-8 col-span-12">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-300 pt-2">
                            Post on 2nd December 2023
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
                                <div className="text-xl font-bold">
                                    {blog.author.name}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention
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