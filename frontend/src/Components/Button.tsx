

function Button(props: { label: string, fun: () => void }) {
    return (
        <div className="flex justify-center ">
            <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                onClick={props.fun}>
                {props.label}
            </button>
        </div>
    )
}

export default Button