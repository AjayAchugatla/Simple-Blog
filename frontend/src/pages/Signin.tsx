import Heading from "../Components/Heading"
import Quote from "../Components/Quote"
import Subheading from "../Components/Subheading"
import Input from "../Components/Input"
import { useState } from "react"
import { si } from "@ajayachugatla/medium-common"
import Button from "../Components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Error from "../Components/Error"
import { useEffect } from "react"
import Loader from "../Components/Loader"

function Signin() {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<si>({
        email: "",
        password: ""
    })

    const getuser = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")
        if (token) {
            const reponse = await axios.get(import.meta.env.VITE_BACKEND_URL + '/user/get-user', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (reponse.data.message) {
                setLoading(false);
                navigate('/blogs')
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getuser()
    }, [])

    const handleLogin = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/user/signin", inputs)
            if (response.data.error) {
                setError(response.data.error)
            } else {
                const token = response.data.token
                localStorage.setItem("token", token)
                navigate('/blogs')
            }
        } catch (error) {
            setError("Server Error")
        }
    }
    return (
        <>
            {loading ? <Loader /> :
                <div className="grid md:grid-cols-2 md:mt-0 mt-[25vh]">
                    <Quote />
                    <div className="flex justify-center items-center flex-col">
                        <Heading content="Log Into Your Account" />
                        <Subheading content="Don't have an account?" to={'signup'} />
                        <div className="max-w-md space-y-3">
                            <Input label="email" placeholder="Enter Email" onChange={(e) => {
                                setInputs({ ...inputs, email: e.target.value })
                            }} />
                            <Input label="password" placeholder="Enter Password" onChange={(e) => {
                                setInputs({ ...inputs, password: e.target.value })
                            }} />
                            <Error text={error} />
                            <Button label="Sign In" fun={handleLogin} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Signin