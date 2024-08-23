import Heading from "../Components/Heading"
import Quote from "../Components/Quote"
import Subheading from "../Components/Subheading"
import Input from "../Components/Input"
import { useState } from "react"
import { su } from "@ajayachugatla/medium-common"
import Button from "../Components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Error from "../Components/Error"
import { useEffect } from "react"


function Signup() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [inputs, setInputs] = useState<su>({
        email: "",
        name: "",
        password: ""
    })



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
            }
        }
    }

    useEffect(() => {
        getuser()
    }, [])
    const handleLogin = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/user/signup", inputs)
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
        <div className="grid md:grid-cols-2 md:mt-0 mt-[25vh]">
            <div className="flex justify-center items-center flex-col">
                <Heading content="Create an account" />
                <Subheading content="Already have an account?" to={'signin'} />
                <div className="max-w-md space-y-3">
                    <Input label="email" placeholder="Enter Email" onChange={(e) => {
                        setInputs({ ...inputs, email: e.target.value })
                    }} />
                    <Input label='text' placeholder="Enter Name" onChange={(e) => {
                        setInputs({ ...inputs, name: e.target.value })
                    }} />
                    <Input label="password" placeholder="Enter Password" onChange={(e) => {
                        setInputs({ ...inputs, password: e.target.value })
                    }} />
                    <Error text={error} />
                    <Button label="Sign Up" fun={handleLogin} />
                </div>
            </div>
            <Quote />
        </div>
    )
}

export default Signup