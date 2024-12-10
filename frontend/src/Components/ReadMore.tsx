

const ReadMore = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="flex items-center  text-slate-400 gap-1 p-4 cursor-pointer  font-semibold tracking-widest rounded-lg  duration-300 hover:gap-2 
            text-sm hover:translate-x-3 h-7 "
            onClick={onClick}
        >
            Read More
            <svg
                className="w-5 h-5"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    strokeLinejoin="round"
                    strokeLinecap="round">
                </path>
            </svg>
        </button>

    )
}

export default ReadMore