import { ChangeEvent } from 'react'
import password from '../assets/password.svg'
import name from '../assets/name.svg'
import email from '../assets/email.svg'
import info from '../assets/info.svg'

interface ptype {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


function Input({ label, placeholder, onChange }: ptype) {
    return (
        <div className="flex flex-col mt-5">
            <div className='relative'>
                <input type={label} className={`peer py-3 ${label !== 'password' ? 'px-20' : 'pr-5'} ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none `} placeholder={placeholder}
                    onChange={onChange}></input>
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                    <img src={label === 'text' ? name : label === 'email' ? email : label === 'password' ? password : info} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Input