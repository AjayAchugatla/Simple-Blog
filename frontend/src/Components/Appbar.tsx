import Avatar from "./Avatar"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks"
import Loader from "./Loader"

function Appbar() {
    const navigate = useNavigate()
    const { name, loading } = useUser()
    const logout = () => {
        localStorage.clear()
        navigate('/signin')
    }

    if (loading) {
        return <div><Loader /></div>
    }

    return (
        <div className="border-b flex justify-between px-10 py-3 ">
            <Link to={'/blogs'}>
                <div className="flex justify-center flex-col mt-1">Simple</div>
            </Link>
            <div>
                <Avatar name={name || ""} size={"big"} />
                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-sm rounded-lg text-sm px-5 py-1.5 ml-3 sm:mr-[-20px] " onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Appbar