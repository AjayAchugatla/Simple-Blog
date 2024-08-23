import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";

function New() {
    return (
        <div className="fixed sm:bottom-10 sm:right-5 right-4 bottom-7">
            <div className="flex justify-center flex-col">
                <Link to={'/publish'}>
                    <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-sm rounded-lg text-3xl px-1 py-1.5"> <CiSquarePlus /></button>
                </Link>

            </div>
        </div>
    )
}

export default New