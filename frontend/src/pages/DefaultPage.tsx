import { useEffect } from "react"
import Loader from "../Components/Loader"
import { useNavigate } from "react-router-dom"
import axios from "axios";

function DefaultPage() {

    const navigate = useNavigate();
    const getuser = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            const reponse = await axios.get(import.meta.env.VITE_BACKEND_URL + '/user/get-user', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (reponse.data.message) {
                navigate('/blogs')
            } else {
                navigate('/signin')
            }
        }
        else {
            navigate('/signin')
        }
    }

    useEffect(() => {
        getuser()
    }, [])

    return (
        <div>
            <Loader />
        </div>
    )
}

export default DefaultPage