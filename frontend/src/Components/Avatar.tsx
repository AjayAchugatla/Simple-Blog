

function Avatar(props: { name: string, size: string }) {
    return (
        <div className={`relative inline-flex items-center justify-center ${props.size === 'small' ? 'h-4 w-4' : 'h-8 w-8'}  overflow-hidden bg-gray-100 rounded-full dark:bg-blue-200 pb-1`}>
            <span className={`font-extralight text-black dark:text-black ${props.size === "small" ? 'text-xs' : 'text-lg'}`}>{props.name[0]}</span>
        </div>
    )
}

export default Avatar