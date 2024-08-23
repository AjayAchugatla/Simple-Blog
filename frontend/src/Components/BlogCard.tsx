import Avatar from "./Avatar"
import { Link } from "react-router-dom"

interface props {
    id: string
    authorName: string,
    title: string,
    content: string,
    date: string
}

export function BlogCard({ authorName, title, content, date, id }: props) {
    return (
        <Link to={`/blog/${id}`}>
            <div className='border-b border-slate-200 p-4 w-screen max-w-screen-sm cursor-pointer'>
                <div className='flex'>
                    <div className='flex justify-center flex-col mt-[3px]'>
                        <Avatar size={"small"} name={authorName} />
                    </div>
                    <div className='pl-2 text-sm flex justify-center flex-col'>
                        {authorName}
                    </div>
                    <div className='pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col'>
                        {date}
                    </div>
                </div>
                <div className='text-xl font-semibold pt-2'>
                    {title}
                </div>
                <div className='text-md font-thin'>
                    {`${content.slice(0, 100)} ${content.length > 100 ? "..." : ""}`}
                </div>
                <div className='text-slate-500 text-sm font-thin pt-4'>
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}


export default BlogCard

