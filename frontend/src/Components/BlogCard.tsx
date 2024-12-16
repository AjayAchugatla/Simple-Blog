import Avatar from "./Avatar"
import ReadMore from "./ReadMore"
import Editor from "./TextEditor"

interface props {
    id: string
    authorName: string,
    title: string,
    content: string,
    date: string
    onRead: () => void
}

export function BlogCard({ authorName, title, content, date, onRead }: props) {

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content
    const plainText = tempDiv.innerText
    return (
        <div>
            <div className='border-b border-slate-200 p-4 w-screen max-w-screen-sm '>
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
                <div className='text-xl font-semibold pt-2 flex'>
                    {title}<ReadMore onClick={onRead} />
                </div>
                <div className='text-md font-thin   '>
                    {`${plainText.slice(0, 100)} ${plainText.length > 100 ? "..." : ""}`}
                </div>
                <div className='text-slate-500 text-sm font-thin pt-4'>
                    {`${Math.ceil(plainText.length / 100)} minute(s) read`}
                </div>
            </div>
        </div>
    )
}


export default BlogCard

