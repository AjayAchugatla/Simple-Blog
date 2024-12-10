import Avatar from "./Avatar"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import userAtom from "../recoil/atoms/userAtom"
import { useRecoilValue } from "recoil"
import Logout from "./Logout"

function Appbar() {
    const navigate = useNavigate()
    const name = useRecoilValue(userAtom).name

    const logout = () => {
        localStorage.clear()
        navigate('/signin')
    }

    return (
        <div className="border-b flex justify-between px-10 py-3 ">
            <Link to={'/blogs'}>
                <div className="flex justify-center flex-col mt-1 font-bold text-lg">Simple</div>
            </Link>
            <div className="flex gap-4">
                <Avatar name={name || ""} size={"big"} />
                <Logout onClick={logout} />
            </div>
        </div>
    )
}

export default Appbar